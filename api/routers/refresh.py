from fastapi import APIRouter
from models.token import NewAccessToken, Refresh
from core.security import decode_refresh_token

router = APIRouter(tags=['refresh'])


@router.post("/", response_model=NewAccessToken)
async def refresh(token: Refresh):
    return NewAccessToken(
        access_token=decode_refresh_token(token.token),
    )