from typing import List
from fastapi import APIRouter, Depends, HTTPException, status

from services.tags import TagService
from models.tags import Tag, TagIn
from models.users import User
from .depends import get_current_user, get_tag_service

router = APIRouter(tags=['tags'])


@router.get('/', response_model=List[Tag])
async def read_tags(
    tags: TagService = Depends(get_tag_service),
    current_user: User = Depends(get_current_user),
    limit: int = 100,
    skip: int = 0
):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Вы не авторизированы")
    return await tags.get_all(limit, skip)


@router.post('/', response_model=Tag)
async def create_tag(
    tag: TagIn,
    tags: TagService = Depends(get_tag_service),
    current_user: User = Depends(get_current_user)
):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Вы не авторизированы")
    if not current_user.is_superuser:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="У вас нет доступа")
    return await tags.create(t=tag)

@router.delete('/')
async def delete_tag(
    tag_id: int,
    tags: TagService = Depends(get_tag_service),
    current_user: User = Depends(get_current_user)
):
    if not current_user.is_superuser:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="У вас нет доступа")
    await tags.delete(tag_id)