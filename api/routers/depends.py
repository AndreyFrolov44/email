from fastapi import Depends, HTTPException, status

from services import users, lists, contacts, templates, user_templates, tags, template_tags, mailings
from db.base import database
from core.security import JWTBearer, decode_access_token
from models.users import UserInfo


def get_user_service() -> users.UserService:
    return users.UserService(database)


def get_list_service() -> lists.ListService:
    return lists.ListService(database)


def get_user_templates_service() -> user_templates.UserTemplatesService:
    return user_templates.UserTemplatesService(database)


def get_contact_service() -> contacts.ContactService:
    return contacts.ContactService(database)


def get_template_service() -> templates.TemplateService:
    return templates.TemplateService(database)


def get_tag_service() -> tags.TagService:
    return tags.TagService(database)


def get_template_tag_service() -> template_tags.TemplateTags:
    return template_tags.TemplateTags(database)


def get_mailing_service() -> mailings.MailingService:
    return mailings.MailingService(database)


async def get_current_user(
    users: users.UserService = Depends(get_user_service),
    token: str = Depends(JWTBearer()),
) -> UserInfo:
    cred_exception = HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Credentials are not valid")
    payload = decode_access_token(token)
    if payload is None:
        raise cred_exception
    email: str = payload.get("sub")
    if email is None:
        raise cred_exception
    user = await users.get_by_email(email=email)
    if user is None:
        return cred_exception
    return user