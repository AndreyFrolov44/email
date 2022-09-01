from fastapi import APIRouter, HTTPException, status, Depends
from models.token import Token, Login
from services.users import UserService
from core.security import verify_password, create_access_token, create_refresh_token
from .depends import get_user_service

router = APIRouter(tags=['auth'])


@router.post("/", response_model=Token)
async def login(login: Login, users: UserService = Depends(get_user_service)):
    user = await users.get_by_email(login.email)
    if user is None or not verify_password(login.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Неверный email или пароль")
    return Token(
        access_token=create_access_token({"sub": user.email}),
        refresh_token=create_refresh_token({"sub": user.email}),
        token_type="Bearer"
    )


