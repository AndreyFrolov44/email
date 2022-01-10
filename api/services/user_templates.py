from fastapi import HTTPException, status

from .base import BaseService
from db.tables import user_template
from models.user_templates import UserTemplates


class UserTemplatesService(BaseService):
    async def get_all(self, user_id: int, limit: int = 100, skip: int = 0) -> UserTemplates:
        query = user_template.select().where(user_template.c.user_id==user_id).limit(limit).offset(skip)
        return await self.database.fetch_all(query=query)

    async def get_by_id(self, user_template_id: int) -> UserTemplates:
        query = user_template.select().where(user_template.c.id==user_template_id)
        return await self.database.fetch_one(query=query)

    async def get_by_user_template(self, user_id, template_id) -> UserTemplates:
        query = user_template.select().where(user_template.c.template_id == template_id, user_template.c.user_id == user_id)
        ut = await self.database.fetch_one(query)
        if ut is None:
            return None
        return UserTemplates.parse_obj(ut)

    async def get_by_template_id(self, template_id) -> UserTemplates:
        query = user_template.select().where(user_template.c.template_id == template_id)
        ut = await self.database.fetch_one(query)
        if ut is None:
            return None
        return UserTemplates.parse_obj(ut)

    async def create(self, user_id: int, template_id: int, templates) -> UserTemplates:
        temp = await templates.get(template_id)
        temp_user = await self.get_by_user_template(user_id, template_id)
        t = await self.get_by_template_id(template_id)
        if temp_user is not None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Вы уже добавли данный шаблон")
        if temp.user_template and t is not None:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Вы не можете добавить данный шаблон")
        create_user_template = UserTemplates(
            user_id=user_id,
            template_id=template_id
        )
        values = {**create_user_template.dict()}
        values.pop("id", None)
        query = user_template.insert().values(**values)
        create_user_template.id = await self.database.execute(query)
        return create_user_template

    async def delete(self, user_id: int, template_id: int):
        query = user_template.delete().where(user_template.c.user_id == user_id, user_template.c.template_id == template_id)
        await self.database.execute(query=query)