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
    # print(response.json())
    assert response.json() == []
    # assert response.status_code == 200
    # assert response.json()["id"] == 1
    # assert response.json()["email"] == "user1@email.com"
    # assert response.json()["username"] == "user1"