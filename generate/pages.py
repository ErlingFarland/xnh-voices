import os
from typing import Mapping
from data import CharacterData

def generate_dir_page(name, relpath, children):
    return "\n".join(
        '<p><a href="{title}">{title}</a></p>'.format(
            title=d,
            url=os.path.join(relpath, d)
        )
        for d in children
    )

def generate_character_page(data: CharacterData, media_files: Mapping[str, str]):
    mismatched_file = (set(data.images.values()) | set(data.files.values())) - set(media_files.keys())
    if mismatched_file:
        raise FileNotFoundError(data.name + ": " + ", ".join(mismatched_file))
    return "<h1>{name}</h1>".format(name=data.name) + "\n".join(
            '<p><img src="{src}"/></p>'.format(src=media_files[f])
            for title, f in data.images.items()
        ) + "\n".join(
            '<p><audio src="{src}" controls="controls"></audio></p>'.format(src=media_files[f])
            for title, f in data.files.items()
        )
