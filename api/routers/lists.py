from typing import List
from fastapi import APIRouter, Depends, HTTPException, status

from services.lists import ListService
from models import lists, users
from .depends import get_list_service, get_current_user

router = APIRouter(tags=['lists'])

@router.get("/", response_model=List[lists.ListOut])
async def read_lists(
    lists: ListService = Depends(get_list_service),
    limit: int = 100,
    skip: int = 0,
    current_user: users.User = Depends(get_current_user)
):
    return await lists.get_all(user_id=current_user.id, limit=limit, skip=skip)

@router.post('/', response_model=lists.ListOut)
async def create_list(
    list: lists.ListIn,
    lists: ListService = Depends(get_list_service),
    current_user: users.User = Depends(get_current_user)
):
    return await lists.create(user_id=current_user.id, l=list)

@router.put('/', response_model=lists.ListOut)
async def update_list(
    id: int,
    list: lists.ListIn,
    lists: lists.List = Depends(get_list_service),
    current_user: users.User = Depends(get_current_user)
):
    return await lists.update(id, current_user, list)

@router.delete('/')
async def delete_list(
    id: str,
    list: ListService = Depends(get_list_service),
    current_user: users.User = Depends(get_current_user)
):
    ids = id.split(',')
    id = '(' + id + ')'
    ls = await list.get_by_id_list(id)
    if len(ls) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Списки не найдены")
    for l in ls:
        list_ob = lists.Lists.parse_obj(l)
        if list_ob.user_id != current_user.id:
            ids.remove(l.id)
    ids = '(' + ','.join(ids) + ')'
    await list.delete(list_id=ids)

@router.get('/info/{list_id}')
async def list_info(
    list_id:int,
    lists: ListService = Depends(get_list_service),
    current_user: users.User = Depends(get_current_user)
):
    list = await lists.get_by_id(list_id)
    if list is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Данного списка не существует")
    if list.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="У вас нет доступа к данному списку")
    return await lists.list_info(list_id)

