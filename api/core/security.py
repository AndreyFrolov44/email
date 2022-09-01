import datetime
from fastapi import Request, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
from jose import jwt
from .config import ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hash: str) -> bool:
    return pwd_context.verify(password, hash)


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    to_encode.update({
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
        "scope": 'access_token'
    })
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(data: dict) -> str:
    to_encode = data.copy()
    to_encode.update({
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES),
        "scope": 'refresh_token'
    })
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str):
    try:
        encoded_jwt = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if encoded_jwt['scope'] == 'access_token':
            return encoded_jwt
        raise HTTPException(status_code=401, detail='Неверный тип токена')
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Срок действия токена истек')
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail='Неверный токен')


def decode_refresh_token(token: str):
    try:
        encoded_jwt = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if encoded_jwt['scope'] == 'refresh_token':
            new_token = create_access_token({'sub': encoded_jwt['sub']})
            return new_token
        raise HTTPException(status_code=401, detail='Неверный тип токена')
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Срок действия токена истек')
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail='Неверный токен')


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        exp = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Данные авторизации не верны")
        if credentials:
            token = decode_access_token(credentials.credentials)
            if token is None:
                raise exp
            return credentials.credentials
        else:
            raise exp