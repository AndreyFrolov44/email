from typing import Optional
from pydantic import BaseModel


class MailingContacts(BaseModel):
    id: Optional[int]
    mailing_id: int
    contact_id: int
    uuid: str
    read: bool = False
    transition: bool = False
    unfollow: bool = False
    spam: bool = False



