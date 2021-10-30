import datetime
import smtplib

from typing import List
from fastapi import HTTPException, status, BackgroundTasks
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.message import EmailMessage
from email.utils import formataddr

from .base import BaseService
from .lists import ListService
from .templates import TemplateService
from db import mailing
from models.users import User
from models.mailings import Mailing, MailingCreate, MailingInfo
from core.config import SMTP


class MailingService(BaseService):
    async def get_all(self, user: User, limit: int = 100, skip: int = 0) -> List[Mailing]:
        query = mailing.select().where(mailing.c.user_id == user.id).limit(limit).offset(skip)
        return await self.database.fetch_all(query)

    async def get_by_id(self, mailing_id: int) -> Mailing:
        query = mailing.select().where(mailing.c.id == mailing_id)
        return await self.database.fetch_one(query)

    async def info(self, user: User, mailing_id: int) -> MailingInfo:
        m = await self.get_by_id(mailing_id)
        if m is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Данной рассылки не существует")
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
            email=m.email
        )
        values = { **mailing_create.dict() }
        values['sent'] = values['delivery'] = values['read'] = values['transition'] = values['unfollow'] = values['spam'] = 0
        values['user_id'] = user.id
        values.pop("id", None)
        query = mailing.insert().values(**values)
        mailing_create.id = await self.database.execute(query)
        # template = templates.get(mailing_create.id)
        contacts = await lists.list_info(list.id)
        background_tasks.add_task(self.send_mail, src=temp.template, contacts=contacts.contacts, from_email = mailing_create.email)
        # self.send_mail(m=mailing_create, lists=lists, templates=templates)
        print("Так")
        return mailing_create

    def send_mail(self, src, contacts, from_email):
        # template =  templates.get(m.template_id)
        # contacts = lists.list_info(m.list_id)
        with open(src, "r") as file:
             text = file.read()
        contact_list = []
        for contact in contacts:
            contact_list.append(contact.email)
        # print(contact_list)
        # msg = MIMEMultipart()
        # msg['From'] = 'andreFrolov44@yandex.ru'
        # msg['To'] = ','.join(contact_list)
        # msg['Subject'] = 'subject'
        # msg['Reply-to'] = from_email
        # msg.attach(MIMEText(text, 'plain'))

        msg = EmailMessage()
        msg['Subject'] = "Message Subject"
        msg['From'] = formataddr(("Название магазина", "andreFrolov44@yandex.ru"))
        msg['Reply-To'] = formataddr((from_email, from_email))
        msg['To'] = ','.join(contact_list)
        msg.set_content(f"""\
        {text}
        """, subtype='html')



        server = smtplib.SMTP('smtp.yandex.ru', 587)
        server.set_debuglevel(True)
        server.starttls()
        server.login('andreFrolov44@yandex.ru', 'andre.fr690252')
        server.send_message(msg)
        server.quit()
        # BODY = "\r\n".join((
        #     "From: %s" % from_email,
        #     "To: %s" % ', '.join(contact_list),
        #     "Subject: %s" % 'subject',
        #     "",
        #     text
        # ))
        # print(SMTP)
        # server = smtplib.SMTP('smtp.yandex.ru', 587)
        # server.starttls()
        # server.login('andreFrolov44@yandex.ru', 'andre.fr690252')
        # server.sendmail(from_email, contact_list, BODY)
        # server.quit()
        print(text)
        print("Все отправлено")
