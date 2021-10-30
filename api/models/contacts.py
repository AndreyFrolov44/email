import datetime

from typing import Optional
from pydantic import BaseModel


class ContactBase(BaseModel):
    name: Optional[str]
    email: str
    phone_number: Optional[str]
    date: datetime.date
    list_id: int


class Contact(ContactBase):
    id: Optional[int]


class ContactIn(ContactBase):
    pass