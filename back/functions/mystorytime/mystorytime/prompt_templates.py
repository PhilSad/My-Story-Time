prompt_template_translate = lambda text, target_lang: f"""Translate the following text into {target_lang}:
{text}"""

prompt_template_split = lambda chapter, n_panels: f"""{chapter}
Split the above story into {n_panels} parts, each part consisting of one or more sentence and correspond to a single panel in a comic.
For each panel return: "Panel n:" with n the panel number and the splitted text."""

prompt_template_describe = lambda captions: f"""{captions}
    
You are a well known comic artist, for each panel describe the illustration, with detailled but brief sentences. Dynamic composition is prefered.

Always describe the panel like so, no more than one sentence by category:
Panel <n>:
- Character: <description of the character in the scene>
- Setting: <scene setting>
- Lightning: <lighting of the scene>"""

prompt_story_instruction = """
Instructions:
A chapter must be short and end with a cliffhanger.
Every chapter starts with "Chapter N: <title of the chapter>".
"""

prompt_template_writestory = lambda story_idea, hero_name, instructions=prompt_story_instruction: f"""Write a children's story composed of 5 chapters.
{story_idea}
Main character: {hero_name}
{instructions}
"""