from jinja2 import Environment, FileSystemLoader
from pathlib import Path
import os

template_dir = (Path(os.path.abspath(__file__)) / '..' / 'templates').resolve()
template_loader = FileSystemLoader(str(template_dir))
env = Environment(loader=template_loader)

index_template = env.get_template("index.jinja2")
character_template = env.get_template("character.jinja2")