import asyncio
import pytest

from main import app
from models.users import UserIn
from services.users import UserService
from fastapi.testclient import TestClient


def test_user_first_create(temp_db):
    request_data = {
        "username": "user1",
        "email": "user1@email.com",
        "password": "12345678",
        "password2": "12345678"
    }
    with TestClient(app) as client:
        response = client.get("/users/")
    assert response.json() == []
