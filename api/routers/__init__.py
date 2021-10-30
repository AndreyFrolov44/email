from fastapi import APIRouter

from . import users, auth, lists, contacts, templates, tags, mailings

router = APIRouter()
router.include_router(users.router, prefix='/users')
router.include_router(auth.router, prefix='/auth')
router.include_router(lists.router, prefix='/lists')
router.include_router(contacts.router, prefix='/contacts')
router.include_router(templates.router, prefix='/templates')
router.include_router(tags.router, prefix='/tags')
router.include_router(mailings.router, prefix='/mailings')