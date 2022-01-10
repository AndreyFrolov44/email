from databases import Database
from sqlalchemy import create_engine, MetaData
from core.config import POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST


# if TESTING:
#     TEST_SQLALCHEMY_DATABASE_URL = DATABASE_URL
#     database = Database(TEST_SQLALCHEMY_DATABASE_URL)
# else:

SQLALCHEMY_DATABASE_URL = (
    f"postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:5432/{POSTGRES_DB}"
)

database = Database(SQLALCHEMY_DATABASE_URL)

metadata = MetaData()
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
)



