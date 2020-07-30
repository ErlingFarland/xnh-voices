import toml
import os
from typing import NamedTuple

class VConfig(NamedTuple):
    media_root: str

    def get_media_url(self, path):
        return os.path.join(self.media_root, path)

def load_config():
    with open('config.toml') as f:
        d = toml.load(f)
    return VConfig(**d)