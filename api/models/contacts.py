import datetime

from typing import Optional
from pydantic import BaseModel, EmailStr


class ContactBase(BaseModel):
    name: Optional[str]
    email: EmailStr
    phone_number: Optional[str]
    list_id: int


class Contact(ContactBase):
    id: Optional[int]
    date: datetime.date


class ContactAll(Contact):
    list_name: str


class ContactIn(ContactBase):
    pass