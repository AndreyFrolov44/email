import datetime
import email_validator

from typing import Optional
from pydantic import BaseModel, EmailStr, validator


class ContactBase(BaseModel):
    name: Optional[str]
    email: EmailStr
    phone_number: Optional[str]
    list_id: int

    # @validator("email")
    # def email_match(cls, v):
    #     try:
    #         email_validator.validate_email(v)
    #     except:
    #         raise ValueError("Почта указана в неверном формате")
    #     return v


class Contact(ContactBase):
    id: Optional[int]
    date: datetime.date


class ContactAll(Contact):
    list_name: str


class ContactIn(ContactBase):
    pass