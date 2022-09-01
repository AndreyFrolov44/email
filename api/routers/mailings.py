import os
from typing import List
from fastapi import HTTPException, status, APIRouter, Depends, BackgroundTasks
from fastapi.responses import FileResponse

from services.mailings import MailingService
from services.lists import ListService
from services.templates import TemplateService
from services.mailing_contacts import MailingContactsService
from models.mailings import Mailing, MailingCreate, MailingInfo, MailingAll, MailingInfoContacts
from models.users import User
from .depends import get_mailing_service, get_current_user, get_list_service, get_template_service, get_mailing_contacts_service


router = APIRouter(tags=['mailings'])


@router.get('/', response_model=List[MailingAll])
async def read_mailings(
    mailings: MailingService = Depends(get_mailing_service),
    current_user: User = Depends(get_current_user),
    limit: int = 100,
    skip: int = 0,
):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Вы не авторизованы")
    return await mailings.get_all(user=current_user, limit=limit, skip=skip)


@router.post('/', response_model=Mailing)
async def create_mailing(
    mailing: MailingCreate,
    background_tasks: BackgroundTasks,
    mailings: MailingService = Depends(get_mailing_service),
    lists: ListService = Depends(get_list_service),
    mailing_contacts: MailingContactsService = Depends(get_mailing_contacts_service),
    templates: TemplateService = Depends(get_template_service),
    current_user: User = Depends(get_current_user)
):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Вы не авторизованы")
    return await mailings.create(mailing, lists, templates, mailing_contacts, current_user, background_tasks)


@router.get('/info/{mailing_id}', response_model=MailingInfoContacts)
async def mailing_info(
    mailing_id: int,
    mailings: MailingService = Depends(get_mailing_service),
    current_user: User = Depends(get_current_user),
    mailing_contacts: MailingContactsService = Depends(get_mailing_contacts_service),
    limit: int = 100,
    skip: int = 0,
):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Вы не авторизованы")
    return await mailings.info_contacts(user=current_user, id=mailing_id, mailing_contacts=mailing_contacts, limit=limit, skip=skip)


@router.get('/read/{mailing_uuid}')
async def read_the_message(
    mailing_uuid: str,
    mailings: MailingService = Depends(get_mailing_service),
    mailing_contacts: MailingContactsService = Depends(get_mailing_contacts_service)
):
    mc = await mailing_contacts.get_by_uuid(uuid=mailing_uuid)
    if not mc.read:
        m = await mailings.get_by_id(mailing_id=mc.mailing_id)
        await mailings.update_k(id=mc.mailing_id, read=m.read+1)
        await mailing_contacts.update_k(id=mc.id, read=True)
    return FileResponse(os.path.join(os.getcwd(), 'media', 'test.png'))

