from typing import Optional

from pydantic import BaseModel


class UserImageBase(BaseModel):
    img: str
    id: Optional[int]


class UserImageCreate(UserImageBase):
    user_id: int


class UserImage(UserImageBase):
    pass
