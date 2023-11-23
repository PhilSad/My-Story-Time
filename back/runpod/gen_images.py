import torch
from diffusers import StableDiffusionXLPipeline
from PIL import Image
from diffusers.utils import load_image
from ip_adapter import IPAdapterPlusXL
from ip_adapter.custom_pipelines import StableDiffusionXLCustomPipeline
import runpod
import base64
from io import BytesIO
import firebase_admin
from firebase_admin import credentials, storage, firestore
import json
import dotenv
import os
import datetime
dotenv.load_dotenv()

# !mkdir -p models/image_encoder
# !wget -P models https://huggingface.co/h94/IP-Adapter/resolve/main/sdxl_models/ip-adapter-plus-face_sdxl_vit-h.bin
# !wget -O models/image_encoder/pytorch_model.bin https://huggingface.co/h94/IP-Adapter/resolve/main/models/image_encoder/pytorch_model.bin
# !wget -O models/image_encoder/config.json       https://huggingface.co/h94/IP-Adapter/resolve/main/models/image_encoder/config.json

pipe = StableDiffusionXLCustomPipeline.from_single_file(
    "./models/sd_xl_base_1.0.safetensors",
    torch_dtype=torch.float16,
    add_watermarker=False,
)

# load ip-adapter
ip_model = IPAdapterPlusXL(pipe, "models/image_encoder", 
                        "./models/ip-adapter-plus-face_sdxl_vit-h.bin", 
                        "cuda", num_tokens=16)


def generate_picture(ip_model, image, image_desc):
    prompt = f" in a children cartoon style, {image_desc}."
    images = ip_model.generate(pil_image=image, num_samples=1, num_inference_steps=30,
                           prompt=prompt, scale=0.4)
    return images[0]

def add_pictures_to_story(ip_model, story_with_images_desc, image):

    for chapter in story_with_images_desc:
        print(f'done with chapter {chapter["chapter_title"]}')
        for paragraph in chapter['paragraphs']:
            image = generate_picture(ip_model, image, paragraph['image_desc'])
            paragraph['image'] = image

    return story_with_images_desc


def handler(job):
    # initialize firebase
    bucket_id = "mystorytime-e88bd.appspot.com"
    bucket_name="mystorytime-e88bd.appspot.com"
    print('-------------------------------------')
    print(os.environ.get("FIREBASE_KEY").replace("\n", "\\n"))
    print('-------------------------------------')
    cred = credentials.Certificate(json.loads(os.environ.get("FIREBASE_KEY").replace("\n", "\\n")))
    firebase_app = firebase_admin.initialize_app(cred, {
        'storageBucket': bucket_id,
    }, name=bucket_name)
    
    bucket = storage.bucket(name=bucket_name, app=firebase_app)
    firebase_db = firestore.client(app=firebase_app)

    # get inputs
    job_input = job['input']
    url_image = job_input['image_url']
    story_with_images_desc = job_input['story']
    user_id = job_input['user_id']
    story_id = job_input['story_id']

    input_image = load_image(url_image)

    story_with_images_desc = add_pictures_to_story(ip_model, story_with_images_desc, input_image)

    # save images to firebase storage Images/{user_id}/{story_id}/chapter_i_paragraph_j.png
    for i, chapter in enumerate(story_with_images_desc):
        for j, paragraph in enumerate(chapter['paragraphs']):
            image_name = f"Images/{user_id}/{story_id}/chapter_{i}_paragraph_{j}.jpeg"
            # save image to buffer
            image_ref = bucket.blob(image_name)
            buffered = BytesIO()
            paragraph['image'].save(buffered, format="JPEG")
            buffered.seek(0)
            # upload image to firebase storage
            img_str = buffered.getvalue()
            image_ref.upload_from_file(buffered, content_type="image/jpeg")
            # get download url
            download_url = image_ref.generate_signed_url(expiration=datetime.timedelta(days=100000))
            paragraph['image'] = download_url

            


    
    # save story and image links to firestore
    story_ref = firebase_db.collection('Users').document(user_id).collection('Stories').document(story_id)
    story_ref.update({
        'story': story_with_images_desc,
        'status': 'done'
    })
        
    
    return story_with_images_desc

runpod.serverless.start({ "handler": handler}) 
    
    


# if __name__ == "__main__":
#     import argparse
#     import json
#     import time
#     from docx import Document
#     from docx.shared import Inches
#     from io import BytesIO
#     import aspose.words as aw


    
#     parser = argparse.ArgumentParser(description='Generate a story')
#     parser.add_argument('--story_with_image_desc', type=str, default="story.json", help='Story with image description')
#     parser.add_argument('--image_url', default="https://firebasestorage.googleapis.com/v0/b/mystorytime-e88bd.appspot.com/o/test%2Fmy_phil_ip.png?alt=media&token=e60ef995-1dbc-40e1-8de5-dd7b190e6f46", 
#                         type=str, help='Image url')
#     parser.add_argument('--output', type=str, default="story_with_image.docx", help='Output file')
    
#     args = parser.parse_args()
    
#     t1 = time.time()
    
#     with open(args.story_with_image_desc, 'r') as f:
#         story_with_image_desc = json.load(f)
        
#     story_with_image_desc = generate_pictures(args.image_url, story_with_image_desc)
    
#     t2 = time.time()
    
#     print("Story generated in", t2 - t1, "seconds")
    
#     document = Document()
#     for chapter in story_with_image_desc:
#         document.add_heading(chapter['chapter_title'], level=1)
#         for paragraph in chapter['paragraphs']:
#             document.add_paragraph(paragraph["text"])
#             image_buffer = BytesIO()
#             paragraph['image'].save(image_buffer, format='png')
#             document.add_picture(image_buffer, width=Inches(6.0))
#             document.add_page_break()
#     document.save(args.output)
    
#     #convert docx to pdf
#     doc = aw.Document(args.output)
#     doc.save(args.output.replace('.docx', '.pdf'))