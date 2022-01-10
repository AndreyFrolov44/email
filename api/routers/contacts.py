from typing import List
from fastapi import APIRouter, Depends, HTTPException, status

from services.contacts import ContactService
from models.contacts import Contact, ContactIn, ContactAll
from models import lists
from models.users import User
from .depends import get_list_service, get_current_user, get_contact_service
from services.lists import ListService

router = APIRouter(tags=['contacts'])


@router.get("/", response_model=List[Contact])
async def read_contacts(
    list_id: int,
    lists: ListService = Depends(get_list_service),
    contacts: ContactService = Depends(get_contact_service),
    current_user: User = Depends(get_current_user),
    limit: int = 100,
    skip: int = 0,
):
    list = await lists.get_by_id(list_id)
    if list is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Данного списка не существует")
    if list.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="У вас нет доступа к данному списку")
    return await contacts.get_all(list_id=list_id, limit=limit, skip=skip)

@router.post('/', response_model=List[Contact])
async def create_contacts(
    contact: List[ContactIn],
    contacts: ContactService = Depends(get_contact_service),
    lists: ListService = Depends(get_list_service),
    current_user: User = Depends(get_current_user)
):
    for c in contact:
        list = await lists.get_by_id(c.list_id)
        if list is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Списка {c.list_id} не существует")
        if list.user_id != current_user.id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"У вас нет доступа к списку {c.list_id}")
    return await contacts.create(c=contact)

@router.put('/', response_model=Contact)
async def update_contacts(
    id: int,
    contact: ContactIn,
    contacts: ContactService = Depends(get_contact_service),
    lists: ListService = Depends(get_list_service),
    current_user: User = Depends(get_current_user)
):
    list = await lists.get_by_id(contact.list_id)
    if list is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Данного списка не существует")
    if list.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="У вас нет доступа к данному списку")
    return await contacts.update(id=id, c=contact, l=lists, user=current_user)

@router.delete('/')
async def delete_contacts(
    id: str,
    contacts: ContactService = Depends(get_contact_service),
    lists: ListService = Depends(get_list_service),
    current_user: User = Depends(get_current_user)
):
    ids = id.split(',')
    id = '(' + id + ')'
    cs = await contacts.get_by_ids(id)
    # print(cs)
    if len(cs) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Списки не найдены")
    for c in cs:
        contact_ob = Contact.parse_obj(c)
        list = await lists.get_by_id(contact_ob.list_id)
        print(list)
        if list.user_id != current_user.id:
            ids.remove(c.id)
    ids = '(' + ','.join(ids) + ')'
    await contacts.delete(contact_ids=ids)


    # contact = await contacts.get_by_id(id)
    # if contact is None:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Данного контакта не существует")
    # list = await lists.get_by_id(contact.list_id)
    # if list.user_id != current_user.id:
    #     raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="У вас нет доступа к данному списку")
    # await contacts.delete(contact_id=id)

@router.get('/all', response_model=List[ContactAll])
async def all_contacts(
    contacts: ContactService = Depends(get_contact_service),
    current_user: User = Depends(get_current_user),
    limit: int = 100,
    skip: int = 0,
):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Вы не авторизированы")
    return await contacts.all(user_id=current_user.id, limit=limit, skip=skip)

@router.get('/all/count')
async def contacts_count(
    contacts: ContactService = Depends(get_contact_service),
    current_user: User = Depends(get_current_user)
):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Вы не авторизированы")
    return await contacts.all_count(user_id=current_user.id)
