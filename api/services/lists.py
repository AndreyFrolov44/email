import datetime

from typing import List, Optional
from fastapi import HTTPException, status

from db import tables
from models import lists, contacts
from models.users import User
from .base import BaseService


class ListService(BaseService):
    async def get_all(self, user_id: int, limit: int = 100, skip: int = 0) -> List[lists.ListOut]:
        query = tables.list.select().where(tables.list.c.user_id == user_id).limit(limit).offset(skip)
        return await self.database.fetch_all(query=query)

    async def get_by_id(self, id: int) -> Optional[lists.Lists]:
        query = tables.list.select().where(tables.list.c.id == id)
        l = await self.database.fetch_one(query)
        if l is None:
            return None
        return lists.Lists.parse_obj(l)

    async def create(self, user_id: int, l: lists.ListIn) -> lists.ListOut:
        create_list = lists.Lists(
            name=l.name,
            date=datetime.datetime.utcnow(),
            user_id=user_id
        )
        values = {**create_list.dict()}
        values.pop("id", None)
        query = tables.list.insert().values(**values)
        create_list.id = await self.database.execute(query)
        return create_list

    async def update(self, id: int, user: User, l: lists.ListIn) -> lists.ListOut:
        current_list = await self.get_by_id(id)
        if user.id != current_list.user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Вы не имеете доступа к данному списку')
        update_list = lists.Lists(
            id=id,
            name=l.name,
            date=current_list.date,
            user_id=user.id
        )
        values = {**update_list.dict()}
        values.pop("id", None)
        query = tables.list.update().where(tables.list.c.id == id).values(**values)
        await self.database.execute(query)
        return update_list

    async def delete(self, list_id: int):
        query = tables.list.delete().where(tables.list.c.id == list_id)
        await self.database.execute(query)
        await self._delete_all_contacts(list_id)

    async def _delete_all_contacts(self, list_id: int):
        query = tables.contact.delete().where(tables.contact.c.list_id == list_id)
        await self.database.execute(query)

    async def _get_all_contacts(self, list_id: int) -> List[contacts.Contact]:
        query = tables.contact.select().where(tables.contact.c.list_id == list_id)
        return await self.database.fetch_all(query)

    async def list_info(self, list_id: int) -> lists.ListInfo:
        l = await self.get_by_id(list_id)
        contacts = await self._get_all_contacts(list_id)
        list_info = lists.ListInfo(
            name=l.name,
            id=l.id,
            date=l.date,
            user_id=l.user_id,
            contacts=contacts
        )
        return list_info