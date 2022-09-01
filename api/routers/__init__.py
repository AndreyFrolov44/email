from fastapi import APIRouter

from . import users, auth, refresh, lists, contacts, templates, tags, mailings, user_images

router = APIRouter(prefix='/api')
router.include_router(users.router, prefix='/users')
router.include_router(auth.router, prefix='/auth')
router.include_router(refresh.router, prefix='/refresh')
router.include_router(lists.router, prefix='/lists')
router.include_router(contacts.router, prefix='/contacts')
router.include_router(templates.router, prefix='/templates')
router.include_router(tags.router, prefix='/tags')
router.include_router(mailings.router, prefix='/mailings')
router.include_router(user_images.router, prefix='/user_img')