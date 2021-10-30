from typing import Optional
from pydantic import BaseModel, EmailStr, validator, constr


class UserBase(BaseModel):
    username: str
    email: EmailStr


class User(UserBase):
    id: Optional[int] = None


class UserInfo(User):
    number_letter: int
    subscriber: int


class UserRegisterOrUpdate(UserBase):
    id: Optional[int] = None
    password_hash: str
    number_letter: Optional[int]
    subscriber: Optional[int]


class UserEmail(UserRegisterOrUpdate):
    is_superuser: bool


class UserLogin(UserBase):
    password_hash: str


class UserIn(UserBase):
    password: constr(min_length=8)
    password2: str

    @validator("password2")
    def password_match(cls, v, values, **kwargs):
        if 'password' in values and v != values["password"]:
            raise ValueError("Пароли не совпадают")
        return v