import sys
sys.path.append('..')

import pytest
from mystorytime.LLM_queries import LLM_split_and_describe

chapter = "Léa était une petite fille ordinaire, mais elle rêvait de devenir une sorcière puissante. Chaque nuit, elle s'endormait en imaginant des sorts spectaculaires et des potions magiques. Un matin, alors qu'elle se réveillait, une lettre mystérieuse glissa par la fente de sa porte. Elle était invitée à rejoindre l'école des sorciers pour y suivre sa formation. Léa était remplie de joie, mais elle savait qu'elle devait prouver ses compétences pour gagner sa place. Quelle épreuve l'attendait-elle ?"

result = LLM_split_and_describe(chapter)

def test_result_keys_and_values():
    expected_keys = ['text', 'description']
    for item in result:
        assert all(key in item for key in expected_keys)
        assert item['text'] in chapter
        assert item['description'] != ""
