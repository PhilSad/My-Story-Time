import torch
from diffusers import StableDiffusionXLPipeline
from PIL import Image

from ip_adapter import IPAdapterPlusXL
from ip_adapter.custom_pipelines import StableDiffusionXLCustomPipeline



def generate_picture(ip_model, image, image_desc):
    prompt = f"{image_desc}, in a children cartoon style."
    images = ip_model.generate(pil_image=image, num_samples=1, num_inference_steps=30,
                           prompt=prompt, scale=0.4)
    return images[0]

def add_pictures_to_story(ip_model, story_with_images_desc, image):

    for chapter in story_with_images_desc:
        print(f'done with chapter {chapter["chapter_title"]}')
        for paragraph in chapter['paragraphs']:
            paragraph['image'] = generate_picture(ip_model, image, paragraph['image_desc'])
    return story_with_images_desc

def generate_pictures(image, story_with_images_desc):
    # load SDXL pipeline
    pipe = StableDiffusionXLCustomPipeline.from_pretrained(
        "stabilityai/stable-diffusion-xl-base-1.0",
        torch_dtype=torch.float16,
        add_watermarker=False,
    )
    # load ip-adapter
    ip_model = IPAdapterPlusXL(pipe, "models/image_encoder", 
                            "./models/ip-adapter-plus-face_sdxl_vit-h.bin", 
                            "cuda", num_tokens=16)
    story_with_images_desc = add_pictures_to_story(ip_model, story_with_images_desc, image)
    
    return story_with_images_desc
