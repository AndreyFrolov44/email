import datetime

from typing import Optional, List
from pydantic import BaseModel

from .contacts import Contact


class ListBase(BaseModel):
    name: str


class Lists(ListBase):
    id: Optional[int] = None
    date: datetime.datetime
    user_id: int
    contacts_count: Optional[int] # Возможно убрать?


class ListInfo(Lists):
    contacts: Optional[List[Contact]] = None


class ListOut(ListBase):
    id: int
    date: datetime.datetime
    contacts_count: int


class ListIn(ListBase):
    pass