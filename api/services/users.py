import datetime
from typing import List, Optional

from fastapi import HTTPException

from db.tables import user
from models.users import User, UserIn, UserRegisterOrUpdate, UserEmail
from core.security import hash_password
from .base import BaseService


class UserService(BaseService):

    async def get_all(self, limit: int = 100, skip: int = 0) -> List[User]:
        query = user.select().limit(limit).offset(skip)
        return await self.database.fetch_all(query=query)

    async def get_by_id(self, id: int) -> Optional[User]:
        query = user.select().where(user.c.id == id)
        u = await self.database.fetch_one(query)
        if u is None:
            return None
        return User.parse_obj(u)

    async def create(self, u: UserIn) -> Optional[User]:
        db_email_user = await self.get_by_email(u.email)
        if db_email_user:
            raise HTTPException(status_code=400, detail="Данный Email уже используется")
        create_user = UserRegisterOrUpdate(
            username=u.username,
            email=u.email,
            password_hash=hash_password(u.password),
            number_letter=0,
            subscriber=0,
        )
        values = {**create_user.dict()}
        values.pop("id", None)
        query = user.insert().values(**values, is_superuser=False)
        create_user.id = await self.database.execute(query)
        return User(**create_user.dict())

    async def update(self, id: int, u: UserIn) -> User:
        update_user = UserRegisterOrUpdate(
            id=id,
            username=u.username,
            email=u.email,
            password_hash=hash_password(u.password2),
        )
        values = {**update_user.dict()}
        values.pop("id", None)
        values.pop("number_letter", None)
        values.pop("subscriber", None)
        query = user.update().where(user.c.id==id).values(**values)
        await self.database.execute(query)
        return User(**update_user.dict())

    async def get_by_email(self, email: str) -> Optional[UserEmail]:
        query = user.select().where(user.c.email==email)
        u = await self.database.fetch_one(query)
        if u is None:
            return None
        return UserEmail.parse_obj(u)

    async def user_info(self, current_user: User):
        return current_user