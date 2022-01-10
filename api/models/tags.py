from typing import Optional
from pydantic import BaseModel


class TagBase(BaseModel):
    name: str


class Tag(TagBase):
    id: Optional[int]


class TagIn(TagBase):
    pass