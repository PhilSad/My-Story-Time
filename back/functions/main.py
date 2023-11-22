from firebase_functions import firestore_fn
from firebase_functions.firestore_fn import Event, DocumentSnapshot
from firebase_admin import initialize_app, firestore

from mystorytime import generate_whole_story

import dotenv
dotenv.load_dotenv('.env')

initialize_app()

def add_dummy_image_to_story(story):
    for chapter in story:
        for paragraph in chapter['paragraphs']:
            paragraph['image_url'] = "https://firebasestorage.googleapis.com/v0/b/mystorytime-e88bd.appspot.com/o/test%2FComfyUI_00186_.png?alt=media"
    return story


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
    
    db.collection("Users").document(user_id).collection("Stories").document(story_id) \
        .update(dict(status="generating"))
    
    story_with_images_desc = generate_whole_story(language, story_idea, hero_name)
    
    story_with_images_links = add_dummy_image_to_story(story_with_images_desc)
    
    db.collection("Users").document(user_id).collection("Stories").document(story_id) \
        .update(dict(story=story_with_images_links, status="done"))
        