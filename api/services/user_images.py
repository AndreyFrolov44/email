import aiofiles
import aiofiles.os

from fastapi import UploadFile, HTTPException, status
from uuid import uuid4
from core.config import HOST

from db.tables import user_image
from .base import BaseService
from models.user_images import UserImageCreate, UserImage
from models.users import User


class UserImagesService(BaseService):
    async def get_by_id(self, user_id: int, id: int) -> UserImage:
        query = user_image.select().where(user_image.c.user_id == user_id, user_image.c.id == id)
        i = await self.database.fetch_one(query=query)
        if i is None:
            return None
        return UserImage.parse_obj(i)

    async def create(self, user: User, img: UploadFile) -> UserImage:
        img_name = f'media/user_img/{uuid4()}.{img.filename.split(".")[-1]}'
        if img.content_type == 'image/jpeg' or img.content_type == 'image/png' or img.content_type == 'image/svg+xml':
            await self._save_image(file=img, file_name=img_name)
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Не верный тип изображения")
        create_user_image = UserImageCreate(
            img=img_name,
            user_id=user.id
        )
        values = {**create_user_image.dict()}
        values.pop("id", None)
        query = user_image.insert().values(**values)
        create_user_image.id = await self.database.execute(query)
        create_user_image.img = HOST + img_name
        create_user_image = UserImage.parse_obj(create_user_image)
        return create_user_image

    async def delete(self, user: User, user_image_id: int):
        image = await self.get_by_id(user_id=user.id, id=user_image_id)
        if image is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Данного изображения не существует")
        query = user_image.delete().where(user_image.c.id == user_image_id)
        await self.database.execute(query)
        await self._delete_image(image.img)

    async def _save_image(self, file: UploadFile, file_name: str):
        async with aiofiles.open(file_name, "wb") as buffer:
            data = await file.read()
            await buffer.write(data)

    async def _delete_image(self, file_name: str):
        await aiofiles.os.remove(file_name)
        # async with aiofiles.open(file_name, "wb") as buffer:
        #     # data = await file.read()
        #     await buffer.write(data)
