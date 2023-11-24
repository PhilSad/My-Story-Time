import re

from .prompt_templates import prompt_template_writestory
from .LLM_queries import LLM_translate_text, LLM_write_story, LLM_split_and_describe
import logging

# translates every part of the story, chapter_title and text
def translate_whole_story(story, language):
    for chapter in story:
        logging.debug("Translating chapter", chapter['chapter_title'])
        chapter['chapter_title'] = LLM_translate_text(chapter['chapter_title'], language)
        for paragraph in chapter['paragraphs']:
            paragraph['text'] = LLM_translate_text(paragraph['text'], language)
        
    return story


# generate the whole story dict, with image description
def generate_whole_story(language, story_idea, hero_name):
    if language != 'en':
        story_idea = LLM_translate_text(story_idea, "english")
    
    print("Story idea:", story_idea)
    story = LLM_write_story(story_idea, hero_name)
    print("Story:", story)
    pattern = r"(Chapter [^:]+):(.*?)(?=\nChapter|$)"
    chapter_title_and_text = re.findall(pattern, story, re.DOTALL)

    whole_story = []
    for title, text in chapter_title_and_text:
        whole_chapter = {
            "chapter_title": title,
            "text": text,
            "paragraphs": LLM_split_and_describe(text)
        }
        whole_story.append(whole_chapter)


    if language != 'en':
        print("Translating the story into", language)
        whole_story = translate_whole_story(whole_story, language)
        print("Translated story:")

    print("Whole story:")
    print(whole_story)


    return whole_story
