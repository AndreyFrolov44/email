import asyncio
import os
import smtplib
import uuid
import urllib.request

from celery import Celery
from celery.signals import worker_process_init, worker_process_shutdown

from core.config import REDIS_HOST, REDIS_PORT

from email.message import EmailMessage
from email.utils import formataddr
from bs4 import BeautifulSoup

from db.base import database
from models.mailing_contacts import MailingContacts
from core.config import SMTP, EMAIL_ADDRESS, EMAIL_PASSWORD, HOST
from services.mailing_contacts import MailingContactsService


celery = Celery('tasks', broker=f'redis://{REDIS_HOST}:{REDIS_PORT}')


db_conn = None


@worker_process_init.connect
def init_worker(**kwargs):
    global db_conn
    print('Initializing database connection for worker.')
    loop = asyncio.get_event_loop()
    db_conn = loop.run_until_complete(database.connect())


@worker_process_shutdown.connect
def shutdown_worker(**kwargs):
    global db_conn
    if db_conn:
        loop = asyncio.get_event_loop()
        db_conn = loop.run_until_complete(database.disconnect())
        print('Closing database connectionn for worker.')


@celery.task(name="send_mail")
def send_mail(src, contacts, from_email, subject, from_name, mailing_id):
    from services.mailings import MailingService

    with open(os.path.join(os.getcwd(), src), "r") as file:
        text = file.read()

    mailing_contacts_service = MailingContactsService(database)
    mailing_service = MailingService(database)

    soup = BeautifulSoup(text, "html.parser")
    img = soup.find('img', {'class': ['pixel_reed']})
    server = smtplib.SMTP(SMTP, 587)
    server.set_debuglevel(True)
    server.starttls()
    server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
    sent = 0
    delivery = len(contacts)

    loop = asyncio.get_event_loop()

    for contact in contacts:
        try:
            uid = str(uuid.uuid4())
            img['src'] = f'{HOST}api/mailings/read/{uid}'
            msg = EmailMessage()
            msg['Subject'] = subject
            msg['From'] = formataddr((from_name, EMAIL_ADDRESS))
            msg['Reply-To'] = formataddr((from_name, from_email))
            msg['To'] = contact['email']
            msg.set_content(f"""\
            {soup}
            """, subtype='html')
            print('-'*100)
            print(soup.text)
            print(msg)
            server.send_message(msg)
            mc = MailingContacts(
                mailing_id=mailing_id,
                contact_id=contact['id'],
                uuid=uid
            )

            loop.run_until_complete(mailing_contacts_service.create(mc))
            sent += 1
        except Exception as e:
            delivery -= 1
            print('EXCEPTION ' * 10)
            print(e)
    loop.run_until_complete(mailing_service.update_k(mailing_id, sent=sent, delivery=delivery))
    server.quit()
