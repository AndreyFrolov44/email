from typing import List
from fastapi import APIRouter, Depends, HTTPException, status

from services.users import UserService
from models.users import User, UserIn, UserInfo
from .depends import get_user_service, get_current_user


router = APIRouter(tags=['users'])

@router.get("/", response_model=List[User])
async def read_users(
    users: UserService = Depends(get_user_service),
    limit: int = 100,
    skip: int = 0):
    return await users.get_all(limit=limit, skip=skip)

@router.post("/", response_model=User)
async def create_user(
    user: UserIn,
    users: UserService = Depends(get_user_service)):
    return await users.create(u=user)

@router.put("/", response_model=User)
async def update_user(
    user: UserIn,
    users: UserService = Depends(get_user_service),
    current_user: User = Depends(get_current_user)):
    old_user = await users.get_by_id(id=current_user.id)
    if old_user is None or old_user.email != current_user.email:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found user")
    return await users.update(id=current_user.id, u=user)


@router.get('/me', response_model=UserInfo)
async def user_info(
    current_user: UserInfo = Depends(get_current_user),
):
    return current_user


