from typing import Optional

from .base import BaseService
from models.mailing_contacts import MailingContacts
from models.mailings import ContactsList
from db.tables import mailing_contact


class MailingContactsService(BaseService):
    async def get_by_uuid(self, uuid:str) -> Optional[MailingContacts]:
        query = mailing_contact.select().where(mailing_contact.c.uuid == uuid)
        mc = await self.database.fetch_one(query)
        if mc is None:
            return None
        return MailingContacts.parse_obj(mc)

    async def get_contacts_by_mailing_id(self, mailing_id: int, limit: int = 100, skip: int = 0) -> ContactsList:
        query = f"""
            SELECT contacts.id, contacts.name, contacts.email, contacts.phone_number, mailing_contacts.read, mailing_contacts.transition, mailing_contacts.unfollow, mailing_contacts.spam
            FROM mailing_contacts
            JOIN contacts on contacts.id = mailing_contacts.contact_id
            WHERE mailing_contacts.mailing_id = {mailing_id}
            LIMIT {limit} OFFSET {skip};
        """
        return await self.database.fetch_all(query=query)

    async def create(self, mailing_contact_data: MailingContacts):
        values = {**mailing_contact_data.dict()}
        values.pop("id", None)
        query = mailing_contact.insert().values(**values)
        mailing_contact.id = await self.database.execute(query)

    async def update_k(self, id, **kwargs):
        query = mailing_contact.update().where(mailing_contact.c.id == id).values(kwargs)
        await self.database.execute(query)