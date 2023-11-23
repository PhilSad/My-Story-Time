import torch
from diffusers import StableDiffusionXLPipeline
from PIL import Image
from diffusers.utils import load_image
from ip_adapter import IPAdapterPlusXL
from ip_adapter.custom_pipelines import StableDiffusionXLCustomPipeline
import runpod
import base64
import io
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
            
            buffer = io.BytesIO()
            image.save(buffer, format='PNG')  # You can change PNG to any format you need
            buffer.seek(0)
            
            image_base64 = base64.b64encode(buffer.getvalue())
            paragraph['image'] = image_base64.decode('utf-8')

    return story_with_images_desc


def handler(job):
    job_input = job['input']
    url_image = job_input['image_url']
    story_with_images_desc = job_input['story']

    input_image = load_image(url_image)

    story_with_images_desc = add_pictures_to_story(ip_model, story_with_images_desc, input_image)

    
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