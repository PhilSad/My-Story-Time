import dotenv
import openai
import re
dotenv.load_dotenv('.env')

instructions = """
Instructions:
A chapter must be short and end with a cliffhanger."""

imagen_instructions = """-----
Write a very short one sentence visual description of the scene. Include a very short description of the character and its environnement. Keep it short and simple."""

def generate_prompt(story_idea, hero_name, instructions):

    prompt = f"""Write a children's story composed of 5 chapters.
{story_idea}
Main character: {hero_name}
{instructions}
"""
    return prompt

def generate_story(story_idea, hero_name):
    prompt = generate_prompt(story_idea, hero_name, instructions)
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user", "content": prompt}]
    )
    full_text = response.choices[0].message.content
    return full_text

def split_raw_story(story):

    # split story into chapters
    pattern = r"(Chapter \d+: [^\n]+)(.*?)(?=Chapter|$)"

    # Find all matches
    story_by_chapters = re.findall(pattern, story, re.DOTALL)

    # Split the chapters into paragraphs of at least 100 characters
    story_by_chapters_and_paragraphs = []
    for chapter in story_by_chapters:
        chapter_title = chapter[0]
        chapter_content = chapter[1]
        chapter_content_splited = []
        for sentence in chapter_content.split("."):
            sentence = sentence.strip()
            if sentence == "": continue
            if len(chapter_content_splited) == 0:
                chapter_content_splited.append(sentence)
            elif len(chapter_content_splited[-1]) < 100:
                chapter_content_splited[-1] += f". {sentence}"
            else:
                chapter_content_splited.append(sentence)
        story_by_chapters_and_paragraphs.append((chapter_title, chapter_content_splited))
    
    return story_by_chapters_and_paragraphs

def text_to_images_desc(chapter_content):
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user", "content": f"""{chapter_content}
{imagen_instructions}"""}
                  ],
        max_tokens=50
    )
    full_text = response.choices[0].message.content
    return full_text

def add_image_desc(splitted_story):
    story_with_images_desc = list()
    for i, chapter in enumerate(splitted_story):
        chapter_title = chapter[0]
        chapter_content = chapter[1]
        chapter_item = dict()
        chapter_item['chapter_title'] = chapter_title
        chapter_item['paragraphs'] = list()
        print(chapter_title)
        for j, paragraph_text in enumerate(chapter_content):
            paragraph_item = dict()
            paragraph_item['text'] = paragraph_text
            paragraph_item['image_desc'] = text_to_images_desc(paragraph_text)
            chapter_item['paragraphs'].append(paragraph_item)
        story_with_images_desc.append(chapter_item)
    return story_with_images_desc

def translate_text(text, language):
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user", "content": f"""Translate the following text into {language}:
{text}"""}
                  ],
        max_tokens=100
    )
    translation = response.choices[0].message.content
    return translation

def translate_whole_story(story, language):
    for chapter in story:
        chapter['chapter_title'] = translate_text(chapter['chapter_title'], language)
        for paragraph in chapter['paragraphs']:
            paragraph['text'] = translate_text(paragraph['text'], language)
    return story
 

def generate_story_with_images_desc(language, story_idea, hero_name):
    if language != 'en':
        story_idea = translate_text(story_idea, "en")
    print("Story idea:", story_idea)
    story = generate_story(story_idea, hero_name)
    print("Raw story:")
    print(story)
    splitted_story = split_raw_story(story)
    print("Splitted story:")
    print(splitted_story)
    story_with_images_desc = add_image_desc(splitted_story)
    print("Story with images description:")
    print(story_with_images_desc)
    
    if language != 'en':
        print("Translating the story into", language)
        story_with_images_desc = translate_whole_story(story_with_images_desc, language)
        print("Translated story:")
        print(story_with_images_desc)

    return story_with_images_desc

if __name__ == "__main__":
    import argparse
    import json
    import time
    
    parser = argparse.ArgumentParser(description='Generate a story')
    parser.add_argument('--language', type=str, default="fr", help='Language of the story')
    parser.add_argument('--story_idea', type=str, default="Un enfant découvre un monde magique", help='Story idea')
    parser.add_argument('--hero_name', type=str, default="Léo", help='Name of the hero')
    parser.add_argument('--output', type=str, default="story.json", help='Output file')
    
    args = parser.parse_args()
    
    t1 = time.time()
    
    story = generate_story_with_images_desc(args.language, args.story_idea, args.hero_name)
    with open(args.output, 'w') as f:
        json.dump(story, f, indent=4, ensure_ascii=False)
    
    t2 = time.time()
    print("Story generated in", t2 - t1, "seconds")