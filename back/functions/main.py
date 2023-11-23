from firebase_functions import firestore_fn
from firebase_functions.firestore_fn import Event, DocumentSnapshot
from firebase_admin import initialize_app, firestore
import requests
from mystorytime import generate_whole_story

import dotenv
import os
dotenv.load_dotenv('.env')

RUNPOD_URL="https://api.runpod.ai/v2/fsifxg8gticvgu/run"
RUNPOD_KEY=os.environ['RUNPOD_API_KEY']

initialize_app()

def add_dummy_image_to_story(story):
    for chapter in story:
        for paragraph in chapter['paragraphs']:
            paragraph['image_url'] = "https://firebasestorage.googleapis.com/v0/b/mystorytime-e88bd.appspot.com/o/test%2FComfyUI_00186_.png?alt=media"
    return story


def call_runpod(url, key, data):
    headers = {'Authorization': f'Bearer {key}'}
    response = requests.post(url, headers=headers, json=data)
    return response.json()

@firestore_fn.on_document_created(document="/Users/{user_id}/Stories/{story_id}", timeout_sec=300)
def function_generate_story(event: Event[DocumentSnapshot]):
    print('>>>>>>>>>>>>>>>>>>>DEBUG<<<<<<<<<<<<<<<<<<<')
    db = firestore.client()
    
    user_id = event.params['user_id']
    story_id = event.params['story_id']
    
    snapshot = event.data
    story_data = snapshot.to_dict()
    
    story_idea = story_data['story_idea']
    hero_name = story_data['hero_name']
    language = story_data['language'].lower()
    image_url = story_data['urlImage']
    
    
    db.collection("Users").document(user_id).collection("Stories").document(story_id) \
        .update(dict(status="generating"))
    
    story_with_images_desc = generate_whole_story(language, story_idea, hero_name)
    
    
    request_data = dict(
        story=story_with_images_desc,
        user_id=user_id,
        story_id=story_id,
        image_url=image_url
    )
    
    db.collection("Users").document(user_id).collection("Stories").document(story_id) \
        .update(dict(status="done_story"))
    
    call_runpod(RUNPOD_URL, RUNPOD_KEY, request_data)
        
    

        