import os
import pytest

os.environ['TESTING'] = 'True'

from alembic import command
from alembic.config import Config
from core.config import DATABASE_URL
from sqlalchemy_utils import create_database, drop_database


@pytest.fixture(scope="module")
def temp_db():
    create_database(DATABASE_URL) # Создаем БД
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__) + 'api\\'))
    alembic_cfg = Config(os.path.join(base_dir, "alembic.ini")) # Загружаем конфигурацию alembic
    command.upgrade(alembic_cfg, "head") # выполняем миграции

    try:
        yield DATABASE_URL
    finally:
        drop_database(DATABASE_URL) # удаляем БД