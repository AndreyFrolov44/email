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
        query = template.select().where(template.c.user_template == False).limit(limit).offset(skip)
        templates = await self.database.fetch_all(query=query)
        templates_list = []
        for temp in templates:
            t = Template.parse_obj(temp)
            t.tags = await tags.get_all(template_id=t.id)
            templates_list.append(t)
        return templates_list

    async def get_all_user(self, user: User, tags: TemplateTags, limit: int = 100, skip: int = 0) -> List[Template]:
        query = template.select().join(user_template).where(user_template.c.user_id == user.id).limit(limit).offset(skip)
        templates = await self.database.fetch_all(query=query)
        templates_list = []
        for temp in templates:
            t = Template.parse_obj(temp)
            t.tags = await tags.get_all(template_id=t.id)
            templates_list.append(t)
        return templates_list

    async def get_by_id(self, user_id: int, id: int) -> TemplateGetById:
        query = template.join(user_template).select().where(user_template.c.user_id == user_id, user_template.c.template_id == id)
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
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Не верный тип шаблона")
        if img.content_type == 'image/png':
            await self._save_image(file=img, file_name=img_name)
        else:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Не верный тип изображения")
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
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Данного шаблона не существует")
        if temp.user_id != user.id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="У вас нет доступа к данному шаблону")

        file_name = f'media/user_templates/{user.id}_{name}_{uuid4()}.html'
        img_name = f'media/templates_img/{uuid4()}_{img.filename.replace(" ", "-")}'
        if not bool(BeautifulSoup(html, "html.parser").find()):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Не верный тип шаблона")
        if img.content_type == 'image/png':
            await self._save_image(file=img, file_name=img_name)
        else:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Не верный тип изображения")
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
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Данному шаблону нельзя добавить тег")
        await tags.create(template_id=template_id, tag_id=tag_id)
        tags = await tags.get_all(template_id=temp.id)
        temp.tags = tags
        return temp

    async def info(self, tags: TemplateTags, template_id: int, user: User) -> Template:
        temp_user = await self.get_by_id(user_id=user.id, id=template_id)
        temp = Template.parse_obj(await self.get(template_id))
        if temp_user is None and temp.user_template:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="У вас нет доступа к данному шаблону")
        temp = Template.parse_obj(temp)
        temp.tags = await tags.get_all(template_id)
        return temp

    async def delete(self, user: User, template_id: int, user_templates: UserTemplatesService):
        temp = await self.get_by_id(user_id=user.id, id=template_id)
        if temp is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Данного шаблона не существует")
        if not temp.user_template:
            await user_templates.delete(user_id=user.id, template_id=template_id)
            return
        query = template.delete().where(template.c.id == template_id)
        await self.database.execute(query)
        query = user_template.delete().where(user_template.c.user_id == user.id, user_template.c.template_id == template_id)
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
        end_html = """
                    <img class="pixel_reed" src="data:image/jpeg;base64,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" />
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