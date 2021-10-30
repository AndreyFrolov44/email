from starlette.config import Config

config = Config(".env")

ACCESS_TOKEN_EXPIRE_MINUTES = 60
ALGORITHM = "HS256"
SECRET_KEY = config("SECRET_KEY", cast=str, default="2b2d197649061838c0c381612cb117d5f562ff181f2ed68c7847471af22f83ce")
TESTING = config("TESTING", cast=bool, default=False)
SMTP = config("SMTP", cast=str, default="smtp.gmail.com")

if TESTING:
    DATABASE_URL = 'sqlite:///./test.sqlite3'
else:
    DATABASE_URL = config("DATABASE_URL", cast=str, default="")