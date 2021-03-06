import datetime

from typing import Optional
from pydantic import BaseModel, EmailStr


class MailingBase(BaseModel):
    template_id: int
    list_id: int
    # date: datetime.date
    email: EmailStr
    title: str
    organisation: str


class Mailing(MailingBase):
    id: Optional[int]
    user_id: int
    date: datetime.date


class MailingAll(Mailing):
    list_name: str
    sent: int
    delivery: int
    read: int


class MailingCreate(MailingBase):
    pass


class MailingInfo(Mailing):
    sent: int
    delivery: int
    read: int
    transition: int
    unfollow: int
    spam: int