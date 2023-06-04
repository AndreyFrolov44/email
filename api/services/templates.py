import aiofiles

from fastapi import UploadFile, HTTPException, status
from typing import List
from uuid import uuid4
from bs4 import BeautifulSoup

from db.tables import template, user_template
from .base import BaseService
from .user_templates import UserTemplatesService
from .template_tags import TemplateTags
from models.templates import Template, TemplateGetById, TemplateCreate, TemplateIn
from models.users import User
from core.config import HOST


class TemplateService(BaseService):
    async def get_all(self, tags: TemplateTags, limit: int = 100, skip: int = 0) -> List[Template]:
        query = template.select().where(template.c.user_template ==
                                        False).limit(limit).offset(skip)
        templates = await self.database.fetch_all(query=query)
        templates_list = []
        for temp in templates:
            t = Template.parse_obj(temp)
            t.tags = await tags.get_all(template_id=t.id)
            templates_list.append(t)
        return templates_list

    async def get_all_user(self, user: User, tags: TemplateTags, limit: int = 100, skip: int = 0) -> List[Template]:
        query = template.select().join(user_template).where(
            user_template.c.user_id == user.id).limit(limit).offset(skip)
        templates = await self.database.fetch_all(query=query)
        templates_list = []
        for temp in templates:
            t = Template.parse_obj(temp)
            t.tags = await tags.get_all(template_id=t.id)
            templates_list.append(t)
        return templates_list

    async def get_by_id(self, user_id: int, id: int) -> TemplateGetById:
        query = template.join(user_template).select().where(
            user_template.c.user_id == user_id, user_template.c.template_id == id)
        t = await self.database.fetch_one(query=query)
        if t is None:
            return None
        return TemplateGetById.parse_obj(t)

    async def get(self, id: int) -> Template:
        query = template.select().where(template.c.id == id)
        t = await self.database.fetch_one(query)
        if t is None:
            return None
        return Template.parse_obj(t)

    async def create(self, user: User, name: str, html: str, img: UploadFile, user_templates: UserTemplatesService, rows: str) -> Template:
        file_name = f'media/user_templates/{user.id}_{name}_{uuid4()}.html'
        img_name = f'media/templates_img/{uuid4()}_{img.filename.replace(" ", "-")}'
        if not bool(BeautifulSoup(html, "html.parser").find()):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="Не верный тип шаблона")
        if img.content_type == 'image/png':
            await self._save_image(file=img, file_name=img_name)
        else:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="Не верный тип изображения")
        new_html = await self._remove_tags(html)
        await self._save_html(html=new_html, file_name=file_name)
        create_template = TemplateCreate(
            name=name,
            user_template=True,
            template=file_name,
            img=HOST + img_name,
            rows=rows
        )
        values = {**create_template.dict()}
        values.pop("id", None)
        if user.is_superuser:
            values['user_template'] = False
            create_template.user_template = False
        query = template.insert().values(**values)
        create_template.id = await self.database.execute(query)
        create_template = TemplateCreate.parse_obj(create_template)
        if values['user_template']:
            await user_templates.create(user_id=user.id, template_id=create_template.id, templates=self)
        return create_template

    async def update(self, id: int, user: User, name: str, html: str, img: UploadFile, rows: str) -> Template:
        temp = await self.get_by_id(user_id=user.id, id=id)
        if temp is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Данного шаблона не существует")
        if temp.user_id != user.id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="У вас нет доступа к данному шаблону")

        file_name = f'media/user_templates/{user.id}_{name}_{uuid4()}.html'
        img_name = f'media/templates_img/{uuid4()}_{img.filename.replace(" ", "-")}'
        if not bool(BeautifulSoup(html, "html.parser").find()):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="Не верный тип шаблона")
        if img.content_type == 'image/png':
            await self._save_image(file=img, file_name=img_name)
        else:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="Не верный тип изображения")
        new_html = await self._remove_tags(html)
        await self._save_html(html=new_html, file_name=file_name)
        update_template = Template(
            id=id,
            name=name,
            user_template=True,
            template=file_name,
            img=HOST + img_name,
            rows=rows
        )
        values = {**update_template.dict()}
        values.pop('tags', None)
        query = template.update().where(template.c.id == id).values(**values)
        await self.database.execute(query)
        return update_template

    async def add_tag(self, tags: TemplateTags, template_id: int, tag_id: int) -> Template:
        temp = Template.parse_obj(await self.get(id=template_id))
        if temp.user_template:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Данному шаблону нельзя добавить тег")
        await tags.create(template_id=template_id, tag_id=tag_id)
        tags = await tags.get_all(template_id=temp.id)
        temp.tags = tags
        return temp

    async def info(self, tags: TemplateTags, template_id: int, user: User) -> Template:
        temp_user = await self.get_by_id(user_id=user.id, id=template_id)
        temp = Template.parse_obj(await self.get(template_id))
        if temp_user is None and temp.user_template:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="У вас нет доступа к данному шаблону")
        temp = Template.parse_obj(temp)
        temp.tags = await tags.get_all(template_id)
        return temp

    async def delete(self, user: User, template_id: int, user_templates: UserTemplatesService):
        temp = await self.get_by_id(user_id=user.id, id=template_id)
        if temp is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Данного шаблона не существует")
        if not temp.user_template:
            await user_templates.delete(user_id=user.id, template_id=template_id)
            return
        query = template.delete().where(template.c.id == template_id)
        await self.database.execute(query)
        query = user_template.delete().where(user_template.c.user_id == user.id,
                                             user_template.c.template_id == template_id)
        await self.database.execute(query)

    async def _save_image(self, file: UploadFile, file_name: str):
        async with aiofiles.open(file_name, "wb") as buffer:
            data = await file.read()
            await buffer.write(data)

    async def _save_html(self, html: str, file_name: str):
        start_html = """
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    body{
                        font-family: Verdana, Arial, Helvetica, sans-serif;
                        padding: 0;
                        margin: 0;
                    }
                    
                    td {
                        padding: 0;
                        margin: 0;
                    }
                    
                    .row-container {
                         max-width: 500px;
                         margin: 0 auto;
                    }
                     .row-columns {
                         display: flex;
                         box-sizing: border-box;
                    }
                    
                    ul{
                        list-style-type: none;
                    }
                    
                    .editor-table-main{
                        width: 100%;
                    }
                    
                    a {
                        text-decoration: none;
                    }
                </style>
            </head>
            
            <body>
        """
        end_html = f"""
                    <img class="pixel_reed" src="{HOST + f'read/'}" />
                </body>
            </html>
        """
        async with aiofiles.open(file_name, "wb") as buffer:
            await buffer.write(start_html.encode('utf-8'))
            await buffer.write(html.encode('utf-8'))
            await buffer.write(end_html.encode('utf-8'))

    async def _remove_tags(self, html):
        soup = BeautifulSoup(html, "html.parser")
        for tag in soup.find_all(True, {"class": ["row-focus-buttons", "button-move", "editor-button", "row-column-border"]}):
            tag.decompose()
        for tag in soup.find_all(True, {"contenteditable": "true"}):
            tag['contenteditable'] = "false"
        for tag in soup.find_all("a"):
            del tag['disabled']

        return str(soup)
