from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from db.base import database
from routers import router

app = FastAPI()


# origins = ["*"]
#
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app.include_router(router)


@app.get('/')
def root():
    return {"message": "hello"}

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()