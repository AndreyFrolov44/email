import datetime

from typing import List
from sqlalchemy import text
from fastapi import HTTPException, status, BackgroundTasks

from tasks.worker import send_mail
from .base import BaseService
from .lists import ListService
from .templates import TemplateService
from .mailing_contacts import MailingContactsService
from db import mailing
from models.users import User
from models.mailings import Mailing, MailingCreate, MailingInfo, MailingAll, MailingInfoContacts


class MailingService(BaseService):
    async def get_all(self, user: User, limit: int = 100, skip: int = 0) -> List[MailingAll]:
        query = text(f"""
            SELECT 
                mailings.template_id,
                mailings.list_id,
                mailings.date,
                mailings.email,
                mailings.title,
                mailings.organisation,
                mailings.id,
                mailings.user_id,
                mailings.read,
                mailings.sent,
                mailings.delivery,
                lists.name as list_name
            FROM mailings 
                INNER JOIN lists ON lists.id = mailings.list_id 
            WHERE mailings.user_id = {user.id}
            ORDER BY mailings.date DESC
            LIMIT {limit} OFFSET {skip}
        """)
        return await self.database.fetch_all(query)

    async def get_by_id(self, mailing_id: int) -> MailingInfo:
        query = mailing.select().where(mailing.c.id == mailing_id)
        m = await self.database.fetch_one(query)
        if m is None:
            return None
        return MailingInfo.parse_obj(m)

    async def info(self, user: User, mailing_id: int) -> MailingInfo:
        query = mailing.select().where(mailing.c.id == mailing_id)
        m = await self.database.fetch_one(query)
        if m is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Данной рассылки не существует")
        m = MailingInfo.parse_obj(m)
        if m.user_id != user.id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="У вас нет доступа к данной рассылке")
        return m

    async def info_contacts(self, user: User, id: int, mailing_contacts: MailingContactsService, limit: int = 100, skip: int = 0) -> MailingInfoContacts:
        m = await self.info(user=user, mailing_id=id)
        m = MailingInfoContacts.parse_obj(m)
        m.contacts = await mailing_contacts.get_contacts_by_mailing_id(mailing_id=id, limit=limit, skip=skip)
        return m

    async def create(self, m: MailingCreate, lists: ListService, templates: TemplateService, mailing_contacts_service: MailingContactsService, user: User, background_tasks: BackgroundTasks) -> Mailing:
        list = await lists.get_by_id(m.list_id)
        if list is None or list.user_id != user.id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="У вас нет доступа к данному списку")
        temp = await templates.get_by_id(user.id, m.template_id)
        if temp is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="У вас нет данного шаблона")
        mailing_create = Mailing(
            template_id=m.template_id,
            list_id=list.id,
            date=datetime.datetime.utcnow(),
            email=m.email,
            title=m.title,
            organisation=m.organisation,
            user_id=user.id
        )
        values = { **mailing_create.dict() }
        values['sent'] = values['delivery'] = values['read'] = values['transition'] = values['unfollow'] = values['spam'] = 0
        values['user_id'] = user.id
        values.pop("id", None)
        query = mailing.insert().values(**values)
        mailing_create.id = await self.database.execute(query)
        contacts = await lists.list_info(list.id)
        send_mail.delay(
            src=temp.template,
            contacts=contacts.dict()['contacts'],
            from_email=mailing_create.email,
            subject=mailing_create.title,
            from_name=mailing_create.organisation,
            mailing_id=mailing_create.id,
        )

        return mailing_create

    async def update_k(self, id, **kwargs):
        query = mailing.update().where(mailing.c.id == id).values(kwargs)
        await self.database.execute(query)





