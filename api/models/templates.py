from typing import Optional, List
from pydantic import BaseModel

from .tags import Tag


class TemplateBase(BaseModel):
    name: str


class TemplateCreate(TemplateBase):
    id: Optional[int]
    template: str
    user_template: bool


class Template(TemplateCreate):
    tags: List[Tag] = []


class TemplateGetById(BaseModel):
    user_id: int


class TemplateIn(TemplateBase):
    pass