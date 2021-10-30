from typing import List
from fastapi import HTTPException, status

from .base import BaseService
from models.tags import Tag, TagIn
from db.tables import tag, template_tag


class TagService(BaseService):
    async def get_all(self, limit: int = 100, skip: int = 0) -> List[Tag]:
        query = tag.select().limit(limit).offset(skip)
        return await self.database.fetch_all(query=query)

    async def get_by_id(self, id: int) -> Tag:
        query = tag.select().where(tag.c.id == id)
        return await self.database.fetch_one(query)

    async def get_by_name(self, name: str) -> Tag:
        query = tag.select().where(tag.c.name == name)
        return await self.database.fetch_one(query)

    async def create(self, t: TagIn) -> Tag:
        current_tag = await self.get_by_name(t.name)
        if current_tag:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Данный тег уже существует")
        create_tag = Tag(
            name=t.name
        )
        values = {**create_tag.dict()}
        values.pop("id", None)
        query = tag.insert().values(**values)
        create_tag.id = await self.database.execute(query)
        return create_tag

    async def delete(self, tag_id: int):
        query = tag.delete().where(tag.c.id == tag_id)
        await self.database.execute(query)
        self.delete_template_tag(tag_id)

    async def delete_template_tag(self, tag_id: int):
        query = template_tag.delete().where(template_tag.c.tag_id == tag_id)
        await self.database.execute(query)


