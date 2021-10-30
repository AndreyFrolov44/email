import datetime

from typing import Optional
from pydantic import BaseModel, EmailStr


class MailingBase(BaseModel):
    template_id: int
    list_id: int
    date: datetime.datetime
    email: EmailStr


class Mailing(MailingBase):
    id: Optional[int]


class MailingCreate(MailingBase):
    pass


class MailingInfo(MailingBase):
    sent: int
    delivery: int
    read: int
    transition: int
    unfollow: int
    spam: int