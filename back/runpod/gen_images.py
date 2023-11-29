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
import face_detection
import json
import dotenv
import os
import datetime
import numpy as np

dotenv.load_dotenv()

# initialize firebase
bucket_id = "mystorytime-e88bd.appspot.com"
bucket_name="mystorytime-e88bd.appspot.com"
cred = credentials.Certificate(json.loads(os.environ.get("FIREBASE_KEY").replace("\n", "\\n")))
firebase_app = firebase_admin.initialize_app(cred, {
    'storageBucket': bucket_id,
}, name=bucket_name)

bucket = storage.bucket(name=bucket_name, app=firebase_app)
firebase_db = firestore.client(app=firebase_app)





pipe = StableDiffusionXLCustomPipeline.from_single_file(
    "./models/sd_xl_base_1.0.safetensors",
    torch_dtype=torch.float16,
    add_watermarker=False,
)

# load ip-adapter
ip_model = IPAdapterPlusXL(pipe, "models/image_encoder", 
                        "./models/ip-adapter-plus-face_sdxl_vit-h.bin", 
                        "cuda", num_tokens=16)

face_detector = face_detection.build_detector(
  "DSFDDetector", confidence_threshold=.5, nms_iou_threshold=.3)


def crop_user_head(image):
    """
    Crop the head of the person in the image
    input: PIL image
    output: PIL image
    """
    # center crop
    width, height = image.size
    if width > height:
        left = (width - height)/2
        top = 0
        right = (width + height)/2
        bottom = height
    else:
        left = 0
        top = (height - width)/2
        right = width
        bottom = (height + width)/2
    image = image.crop((left, top, right, bottom))
        
    # detect face
    padding = 25
    detects = face_detector.detect(np.array(image))
    if len(detects) == 1:
        xmin, ymin, xmax, ymax, detection_confidence = detects[0]
        cropped_image = image.crop((xmin - padding*2, ymin - padding*2, xmax + padding*2, ymax))
    else:
        raise Exception("No face detected or more than one face detected")
    
    return cropped_image

def generate_base_picture( image, style): 
    prompt = f"Close-up, high-resolution solo, portrait of a single person's head, centered in the frame, {style}, with a clear focus on detailed facial features, colorful background"
    negative_prompt = "full body, torso, black and white, multiple, mosaic"
    
    base_image = ip_model.generate(pil_image=image, num_samples=1, num_inference_steps=50,
                           prompt=prompt, negative_prompt=negative_prompt, scale=0.35)[0]
    padding = 25
    detects = face_detector.detect(np.array(base_image))
    while len(detects) != 1:
        base_image = ip_model.generate(pil_image=image, num_samples=1, num_inference_steps=50,
                           prompt=prompt, negative_prompt=negative_prompt, scale=0.35)[0]
        detects = face_detector.detect(np.array(base_image))
        
        
    xmin, ymin, xmax, ymax, detection_confidence = detects[0]
    cropped_image = base_image.crop((xmin - padding*2, ymin - padding*2, xmax + padding*2, ymax))
    
    return cropped_image
    


def generate_picture(image, image_desc):
    prompt = f"{image_desc}"
    images = ip_model.generate(pil_image=image, num_samples=1, num_inference_steps=35,
                           prompt=prompt, scale=0.7)
    return images[0]


def add_pictures_to_story(story_with_images_desc, base_image):

    for chapter in story_with_images_desc:
        print(f'done with chapter {chapter["chapter_title"]}')
        for paragraph in chapter['paragraphs']:
            image = generate_picture(base_image, paragraph['image_desc'])
            paragraph['image'] = image

    return story_with_images_desc


def upload_image_and_get_url(bucket, image, user_id, story_id, image_name):
    image_name = f"Images/{user_id}/{story_id}/{image_name}.jpeg"
    print('saving image to', image_name)
    # save image to buffer
    image_ref = bucket.blob(image_name)
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    buffered.seek(0)
    # upload image to firebase storage
    img_str = buffered.getvalue()
    image_ref.upload_from_file(buffered, content_type="image/jpeg")
    # get download url
    download_url = image_ref.generate_signed_url(expiration=datetime.timedelta(days=100000))
    print('done saving image to', image_name)
    return download_url

def handler(job):

    # get inputs
    job_input = job['input']
    url_image = job_input['image_url']
    story_with_images_desc = job_input['story']
    user_id = job_input['user_id']
    story_id = job_input['story_id']
    story_idea = job_input['story_idea']
    style = job_input.get('style')
    if style =="default":
        style = "in a children cartoon style"

    input_image = load_image(url_image)
    
    input_image = crop_user_head(input_image)
    
    input_image = generate_base_picture(input_image, style)
    
    prompt_poster = f"Beautiful portrait, {story_idea}, cinematic, beautiful ovie poster style, epic, lights and shadows"
    poster_image = generate_picture( input_image, prompt_poster)
    poster_image_url = upload_image_and_get_url(bucket, poster_image, user_id, story_id, 'poster.jpeg')

    story_with_images_desc = add_pictures_to_story( story_with_images_desc, input_image)

    # save images to firebase storage Images/{user_id}/{story_id}/chapter_i_paragraph_j.png
    for i, chapter in enumerate(story_with_images_desc):
        for j, paragraph in enumerate(chapter['paragraphs']):
            image_name = f"chapter_{i}_paragraph_{j}.jpeg"
            print('saving image to', image_name)
            download_url = upload_image_and_get_url(bucket, paragraph['image'], user_id, story_id, image_name)
            paragraph['image'] = download_url
            print('done saving image to', image_name)
            print(paragraph)

            


    print('saving to firestore')
    # save story and image links to firestore
    story_ref = firebase_db.collection('Users').document(user_id).collection('Stories').document(story_id)
    story_ref.update({
        'story': story_with_images_desc,
        'status': 'done',
        'poster':  poster_image_url,
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