import datetime
import smtplib

from typing import List
from sqlalchemy import text
from fastapi import HTTPException, status, BackgroundTasks
from email.message import EmailMessage
from email.utils import formataddr

from .base import BaseService
from .lists import ListService
from .templates import TemplateService
from db import mailing
from models.users import User
from models.mailings import Mailing, MailingCreate, MailingInfo, MailingAll
from core.config import SMTP, EMAIL_ADDRESS, EMAIL_PASSWORD


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
        # query = mailing.join().select().where(mailing.c.user_id == user.id).limit(limit).offset(skip)
        return await self.database.fetch_all(query)

    async def get_by_id(self, mailing_id: int) -> Mailing:
        query = mailing.select().where(mailing.c.id == mailing_id)
        m = await self.database.fetch_one(query)
        if m is None:
            return None
        return Mailing.parse_obj(m)

    async def info(self, user: User, mailing_id: int) -> MailingInfo:
        query = mailing.select().where(mailing.c.id == mailing_id)
        m = await self.database.fetch_one(query)
        if m is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Данной рассылки не существует")
        m = MailingInfo.parse_obj(m)
        if m.user_id != user.id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="У вас нет доступа к данной рассылке")
        return m

    async def create(self, m: MailingCreate, lists: ListService, templates: TemplateService, user: User, background_tasks: BackgroundTasks) -> Mailing:
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
        background_tasks.add_task(
            self.send_mail,
            src=temp.template,
            contacts=contacts.contacts,
            from_email=mailing_create.email,
            subject=mailing_create.title,
            from_name=mailing_create.organisation,
            mailing_id=mailing_create.id
        )
        return mailing_create

    async def update_k(self, id, **kwargs):
        query = mailing.update().where(mailing.c.id == id).values(kwargs)
        await self.database.execute(query)

    async def send_mail(self, src, contacts, from_email, subject, from_name, mailing_id):
        with open(src, "r") as file:
            text = file.read()

        server = smtplib.SMTP(SMTP, 587)
        server.set_debuglevel(True)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)

        sent = 0
        delivery = len(contacts)
        for contact in contacts:
            try:
                msg = EmailMessage()
                msg['Subject'] = subject
                msg['From'] = formataddr((from_name, EMAIL_ADDRESS))
                msg['Reply-To'] = formataddr((from_name, from_email))
                msg['To'] = contact.email
                msg.set_content(f"""\
                {text}
                """, subtype='html')
                server.send_message(msg)
                sent += 1
            except Exception as e:
                delivery -= 1
                print(e)

        await self.update_k(mailing_id, sent=sent, delivery=delivery)
        server.quit()

