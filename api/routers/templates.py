from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File

from models.templates import Template
from models.users import User
from .depends import get_template_service, get_current_user, get_user_templates_service, get_template_tag_service
from services.templates import TemplateService
from services.user_templates import UserTemplatesService
from services.template_tags import TemplateTags

router = APIRouter(tags=['templates'])


@router.get("/library", response_model=List[Template])
async def read_templates_library(
    templates: TemplateService = Depends(get_template_service),
    tags: TemplateTags = Depends(get_template_tag_service),
    limit: int = 100,
    skip: int = 0,
):
    return await templates.get_all(tags=tags, limit=limit, skip=skip)

@router.get("/", response_model=List[Template])
async def read_templates_user(
    templates: TemplateService = Depends(get_template_service),
    tags: TemplateTags = Depends(get_template_tag_service),
    limit: int = 100,
    skip: int = 0,
    current_user: User = Depends(get_current_user),
):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Вы не авторизированы")
    return await templates.get_all_user(user=current_user, tags=tags, limit=limit, skip=skip)

@router.post('/', response_model=Template)
async def create_template(
    name: str,
    templates: TemplateService = Depends(get_template_service),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    user_templates: UserTemplatesService = Depends(get_user_templates_service)
):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Вы не авторизированы")
    template = await templates.create(user=current_user, file=file, name=name, user_templates=user_templates)
    return template

@router.put('/', response_model=Template)
async def update_templates(
    id: int,
    name: str,
    templates: TemplateService = Depends(get_template_service),
    current_user: User = Depends(get_current_user),
    tags: TemplateTags = Depends(get_template_service)
):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Вы не авторизированы")
    return await templates.update(user=current_user, id=id, name=name, tags=tags)

@router.delete('/{id}')
async def delete_template(
    id: int,
    templates: TemplateService = Depends(get_template_service),
    user_templates: UserTemplatesService = Depends(get_user_templates_service),
    current_user: User = Depends(get_current_user)
):
    await templates.delete(user=current_user, template_id=id, user_templates=user_templates)

@router.post('/add/{id}', response_model=Template)
async def add_template(
    id: int,
    user_templates: UserTemplatesService = Depends(get_user_templates_service),
    current_user: User = Depends(get_current_user),
    templates: TemplateService = Depends(get_template_service)
):
    await user_templates.create(user_id=current_user.id, template_id=id, templates=templates)

@router.post('/tag/{template_id}', response_model=Template)
async def add_template_tag(
    template_id: int,
    tag_id: int,
    template_tags: TemplateTags = Depends(get_template_tag_service),
    template: TemplateService = Depends(get_template_service),
    current_user: User = Depends(get_current_user)
):
    if current_user is None or not current_user.is_superuser:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="У вас нет доступа")
    return await template.add_tag(template_tags, template_id, tag_id)

@router.get('/info/{template_id}', response_model=Template)
async def template_info(
    template_id: int,
    templates: TemplateService = Depends(get_template_service),
    template_tags: TemplateTags = Depends(get_template_tag_service),
    current_user: User = Depends(get_current_user)
):
    if current_user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Вы не авторизованы")
    return await templates.info(tags=template_tags, template_id=template_id, user=current_user)