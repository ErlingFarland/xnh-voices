import os
from typing import Mapping
from data import CharacterData
from template import index_template, character_template

def generate_dir_page(name, relpath, children):
    return index_template.render(name=name, relpath=relpath, children=children)

def generate_character_page(data: CharacterData, media_files: Mapping[str, str]):
    mismatched_file = (set(data.images.values()) | set(data.files.values())) - set(media_files.keys())
    if mismatched_file:
        raise FileNotFoundError(data.name + ": " + ", ".join(mismatched_file))
    return character_template.render(
        data=data, 
        images={n: media_files[f] for n, f in data.images.items()},
        files={n: media_files[f] for n, f in data.files.items()})
