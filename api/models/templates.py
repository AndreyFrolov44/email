from typing import Optional, List
from pydantic import BaseModel

from .tags import Tag


class TemplateBase(BaseModel):
    name: str


class TemplateIn(TemplateBase):
    html: str


class TemplateCreate(TemplateBase):
    id: Optional[int]
    template: str
    user_template: bool
    img: str


class Template(TemplateCreate):
    tags: List[Tag] = []


class TemplateGetById(TemplateCreate):
    user_id: int


# class TemplateIn(TemplateBase):
#     pass