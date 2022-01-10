import datetime

from fastapi import HTTPException, status
from typing import List
from sqlalchemy import func, text

from db.tables import contact
from db import tables
from .base import BaseService
from .lists import ListService
from models.contacts import Contact, ContactIn, ContactAll
from models.users import User
from models import lists


class ContactService(BaseService):
    async def get_all(self, list_id: int, limit: int = 100, skip: int = 0) -> List[Contact]:
        query = contact.select().where(contact.c.list_id == list_id).limit(limit).offset(skip)
        return await self.database.fetch_all(query=query)

    async def all(self, user_id: int, limit: int = 100, skip: int = 0) -> List[ContactAll]:
        query = text(f"""
            SELECT 
                contacts.*, lists.name as list_name
            FROM contacts 
            JOIN lists ON lists.id = contacts.list_id 
            WHERE lists.user_id = {user_id}
            LIMIT {limit} OFFSET {skip}
        """)
        # query = contact.join(tables.list, contact.c.list_id == tables.list.c.id).select([tables.list.c.name]).where(tables.list.c.user_id == user_id).limit(limit).offset(skip)
        return await self.database.fetch_all(query=query)

    async def all_count(self, user_id: int) -> int:
        query = text(f"SELECT count(*) FROM contacts JOIN lists ON lists.id = contacts.list_id WHERE lists.user_id = {user_id}")
        return await self.database.fetch_one(query=query)

    async def get_by_id(self, id: int) -> Contact:
        query = contact.select().where(contact.c.id == id)
        c = await self.database.fetch_one(query)
        if c is None:
            return None
        return Contact.parse_obj(c)

    async def get_by_ids(self, ids) -> Contact:
        query = text(f"""
            SELECT 
                *
            FROM contacts 
            WHERE contacts.id IN {ids}
        """)
        return await self.database.fetch_all(query)

    async def create(self, c: List[ContactIn]) -> List[Contact]:
        create_contacts = []
        for con in c:
            create_contact = Contact(
                name=con.name,
                email=con.email,
                phone_number=con.phone_number,
                date=datetime.datetime.utcnow(),
                list_id=con.list_id
            )
            values = {**create_contact.dict()}
            values.pop("id", None)
            create_contacts.append(values)

        query = contact.insert().values(create_contacts)
        create_contacts = await self.database.execute(query)
        return create_contacts

    async def update(self, id: int, c: ContactIn, l: ListService, user: User) -> Contact:
        contact = await self.get_by_id(id)
        if contact is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Данного контакта не существует")
        list = await l.get_by_id(contact.list_id)
        if list.user_id != user.id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="У вас нет доступа к данному контакту")
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

    async def delete(self, contact_ids):
        query = f"""DELETE FROM contacts WHERE contacts.id in {contact_ids}"""
        # query = tables.contact.delete().where(tables.contact.c.list_id in list_id)
        await self.database.execute(query)