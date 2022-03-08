from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File

from models.user_images import UserImage
from models.users import User
from .depends import get_current_user, get_user_image_service
from services.user_images import UserImagesService

router = APIRouter(tags=['user_images'])


@router.post("/", response_model=UserImage)
async def create_user_image(
        img: UploadFile = File(...),
        current_user: User = Depends(get_current_user),
        user_images: UserImagesService = Depends(get_user_image_service)
):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Вы не авторизированы")
    user_image = await user_images.create(user=current_user, img=img)
    return user_image


@router.delete("/{id}")
async def delete_user_image(
        id: int,
        current_user: User = Depends(get_current_user),
        user_images: UserImagesService = Depends(get_user_image_service)
):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Вы не авторизированы")
    await user_images.delete(user=current_user, user_image_id=id)
