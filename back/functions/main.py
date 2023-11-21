# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import db_fn
from firebase_admin import initialize_app
from gen_story import generate_story_with_images_desc

initialize_app()


@db_fn.on_value_created(reference="/Users/{user_id}/Stories/{story_id}")
def function_generate_story(req):
    user_id = req.path_params["user_id"]
    story_id = req.path_params["story_id"]
    story_idea = req.data["story_idea"]
    hero_name = req.data["hero_name"]
    language = req.data["language"]
    story_with_images_desc = generate_story_with_images_desc(language, story_idea, hero_name)
    db_fn.reference(f"/Users/{user_id}/Stories/{story_id}/story_with_images_desc").set(story_with_images_desc)
    return {"status": "ok"}