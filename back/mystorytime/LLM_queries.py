import re
import openai

from .prompt_templates import prompt_template_describe, prompt_template_split

# Convert a list of panel descriptions with fields to dict
def to_description_dict(chatgpt_reponse):
    pattern = r"Panel [^:]+:(.*?)(?=\nPanel|$)"
    descriptions = re.findall(pattern, chatgpt_reponse, re.DOTALL)

    splitted_descriptions = []
    for description in descriptions:
        pattern = r"\n- ([^:]+): (.*?)(?=\n-|$)"
        matches = re.findall(pattern, description, re.DOTALL)

        splitted_descriptions.append(
            {
                key: value for key, value in matches 
            }
        )

    return splitted_descriptions

# Split chapter into sections using ChatGPT
def LLM_split_chapter(chapter, n_panels):
    prompt = prompt_template_split(chapter, n_panels)

    response_caption = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user", "content": prompt}]
    ).choices[0].message.content

    pattern = r"Panel [^:]+:(.*?)(?=\nPanel|$)"
    captions = re.findall(pattern, response_caption, re.DOTALL)
    captions = [caption.strip() for caption in captions]

    return captions

# Describe every caption passed to the function while keeping the context
def LLM_describe_chapter(captions):
    response_caption = "\n\n".join([f"Panel {i}: {text}" for i, text in enumerate(captions)])

    image_desc_prompt = prompt_template_describe(response_caption)

    response_description = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user", "content": f"{response_caption}\n\n{image_desc_prompt}"}]
    ).choices[0].message.content

    description_dict = to_description_dict(response_description)

    description_prompts = [
        f"{desc_dict['Character'].strip()} in {desc_dict['Setting'].strip()} {desc_dict['Lighting'].strip()}".strip()
        for desc_dict in description_dict
    ]

    return description_prompts

# returns a paragraph dictionnary with text and description for a given chapter
def LLM_split_and_describe(chapter, n_panels=4):
    captions = LLM_split_chapter(chapter, n_panels)
    description_prompts = LLM_describe_chapter(captions)

    paragraphs = [{
        "text": text,
        "description": description
    } for text, description in zip(captions, description_prompts)]

    return paragraphs
