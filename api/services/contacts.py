import datetime

from fastapi import HTTPException, status
from typing import List

from db.tables import contact
from .base import BaseService
from models.contacts import Contact, ContactIn
from models.users import User
from models import lists


class ContactService(BaseService):
    async def get_all(self, list_id: int, limit: int = 100, skip: int = 0) -> List[Contact]:
        query = contact.select().where(contact.c.list_id == list_id).limit(limit).offset(skip)
        return await self.database.fetch_all(query=query)

    async def get_by_id(self, id: int) -> Contact:
        query = contact.select().where(contact.c.id == id)
        c = await self.database.fetch_one(query)
        if c is None:
            return None
        return c

    async def create(self, c: ContactIn) -> Contact:
        create_contact = Contact(
            name=c.name,
            email=c.email,
            phone_number=c.phone_number,
            date=datetime.datetime.utcnow(),
            list_id=c.list_id
        )
        values = {**create_contact.dict()}
        values.pop("id", None)
        query = contact.insert().values(**values)
        create_contact.id = await self.database.execute(query)
        return create_contact

    async def update(self, id: int, c: ContactIn) -> Contact:
        update_contact = Contact(
            name=c.name,
            email=c.email,
            phone_number=c.phone_number,
            date=datetime.datetime.utcnow(),
            list_id=c.list_id
        )
        values = {**update_contact.dict()}
        values.pop("id", None)
        query = contact.update().where(contact.c.id == id).values(**values)
        await self.database.execute(query)
        return update_contact

    async def delete(self, contact_id):
        query = contact.delete().where(contact.c.id == contact_id)
        return await self.database.execute(query)