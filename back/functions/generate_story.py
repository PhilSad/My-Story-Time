import argparse
import json
import time

from mystorytime_lib import generate_whole_story

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Generate a story')
    parser.add_argument('--language', type=str, default="french", help='Language of the story')
    parser.add_argument('--story_idea', type=str, default="Un enfant découvre un monde magique", help='Story idea')
    parser.add_argument('--hero_name', type=str, default="Léo", help='Name of the hero')
    parser.add_argument('--output', type=str, default="story.json", help='Output file')
    
    args = parser.parse_args()
    
    t1 = time.time()
    
    story = generate_whole_story(args.language, args.story_idea, args.hero_name)
    with open(args.output, 'w') as f:
        json.dump(story, f, indent=4, ensure_ascii=False)
    
    t2 = time.time()
    print("Story generated in", t2 - t1, "seconds")
