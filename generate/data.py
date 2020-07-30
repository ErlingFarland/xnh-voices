from typing import NamedTuple, List, Mapping

class CharacterData(NamedTuple):
    name: str
    source: str
    cv: str
    category: str
    language: str
    tags: List[str]
    images: Mapping[str, str]
    files: Mapping[str, str]
