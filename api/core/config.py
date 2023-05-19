import os

from starlette.config import Config

config = Config(".env")

ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_MINUTES = 25 * 60 * 24
ALGORITHM = "HS256"
SECRET_KEY = config("SECRET_KEY", cast=str, default="2b2d197649061838c0c381612cb117d5f562ff181f2ed68c7847471af22f83ce")

POSTGRES_DB = config("POSTGRES_DB", cast=str, default="")
POSTGRES_USER = config("POSTGRES_USER", cast=str, default="")
POSTGRES_PASSWORD = config("POSTGRES_PASSWORD", cast=str, default="")
POSTGRES_HOST = config("POSTGRES_HOST", cast=str, default="")

HOST = config("HOST", cast=str, default="http://localhost:8000/")

SMTP = config("SMTP", cast=str, default="")
EMAIL_ADDRESS = config("EMAIL_ADDRESS", cast=str, default="")
EMAIL_PASSWORD = config("EMAIL_PASSWORD", cast=str, default="")

CELERY_BROKER_URL = config("CELERY_BROKER_URL", cast=str, default="redis://localhost:6379")
CELERY_RESULT_BACKEND = config("CELERY_RESULT_BACKEND", cast=str, default="redis://localhost:6379")

REDIS_HOST = config("REDIS_HOST", cast=str, default="redis")
REDIS_PORT = config("REDIS_PORT", cast=str, default="5370")

MAIN_DIRECTORY = os.getcwd()
