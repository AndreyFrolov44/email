from typing import List
from fastapi import HTTPException, status, APIRouter, Depends, BackgroundTasks

from services.mailings import MailingService
from services.lists import ListService
from services.templates import TemplateService
from models.mailings import Mailing, MailingCreate, MailingInfo
from models.users import User
from .depends import get_mailing_service, get_current_user, get_list_service, get_template_service


router = APIRouter(tags=['mailings'])


@router.get('/', response_model=List[Mailing])
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
    templates: TemplateService = Depends(get_template_service),
    current_user: User = Depends(get_current_user)
):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Вы не авторизованы")
    return await mailings.create(mailing, lists, templates, current_user, background_tasks)


@router.get('/info/{mailing_id}', response_model=MailingInfo)
async def mailing_info(
    mailing_id: int,
    mailings: MailingService = Depends(get_mailing_service),
    current_user: User = Depends(get_current_user)
):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Вы не авторизованы")
    return await mailings.info(user=current_user, mailing_id=mailing_id)