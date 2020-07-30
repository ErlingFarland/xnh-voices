import yaml
import shutil
import os
from pathlib import Path
import warnings

from config import load_config, VConfig
from data import CharacterData
from pages import generate_character_page, generate_dir_page

dist = Path('dist')
data = Path('data')
index_file = 'index.yaml'
index_html = 'index.html'
media_file_ext = {'.png', '.jpeg', '.jpg', '.gif', '.webp', '.wav', '.mp3', '.ogg'}

def init_dist():
    if dist.exists():
        shutil.rmtree(dist)

def on_dir(path, dirs):
    rp = Path(os.path.relpath(path, data))
    path = Path(path)
    d = dist / rp
    d.mkdir()
    html = generate_dir_page(path.name, rp, dirs)
    with open(d / index_html, 'w') as f:
        f.write(html)


def on_character(config: VConfig, path, files):
    rp = Path(os.path.relpath(path, data))
    path = Path(path)
    d = dist / rp
    media_files = {
        f: config.get_media_url(rp / f)
        for f in files
        if os.path.splitext(f)[1] in media_file_ext
    }
    with open(path / index_file) as f:
        character = CharacterData(**yaml.load(f))
    html = generate_character_page(character, media_files)
    os.mkdir(d)
    with open(d / index_html, 'w') as f:
        f.write(html)


def main():
    init_dist()

    config = load_config()

    for path, dirs, files in os.walk(data):
        if path.endswith("."):
            continue
        if (Path(path) / index_file).exists():
            on_character(config, path, files)
        else:
            on_dir(path, dirs)
            if not dirs:
                warnings.warn("Empty dir: " + path)

    # with open(dist / index_html, 'w') as f:
    #     f.write("<h1>Hello</h1>")

    


if __name__ == '__main__':
    main()
