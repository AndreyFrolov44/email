from typing import List
from fastapi import HTTPException, status
from sqlalchemy import text
from pydantic import parse_obj_as

from .base import BaseService
from models.template_tags import TemplateTag
from models.templates import Template
from models.tags import Tag
from db.tables import template_tag, tag, template


class TemplateTags(BaseService):
    async def get_all(self, template_id: int) -> List[Tag]:
        query = text(f"SELECT tags.id, tags.name FROM template_tags JOIN tags ON tags.id = template_tags.tag_id JOIN templates ON templates.id = template_tags.template_id WHERE template_tags.template_id = {template_id}")
        return await self.database.fetch_all(query)

    async def get_by_id(self, template_id: int, tag_id: int):
        query = template_tag.select().where(template_tag.c.tag_id == tag_id, template_tag.c.template_id == template_id)
        return await self.database.fetch_one(query)

    async def create(self, template_id: int, tag_id: int) -> int:
        current_tag = await self.get_by_id(template_id=template_id, tag_id=tag_id)
        if current_tag:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Данный тег уже добавлен")
        create_tag = TemplateTag(
            template_id=template_id,
            tag_id=tag_id
        )
        values = {**create_tag.dict()}
        values.pop("id", None)
        query = template_tag.insert().values(**values)
        create_tag.id = await self.database.execute(query)
        return create_tag.id