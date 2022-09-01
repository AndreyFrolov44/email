from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from db import init_db
from db.base import database, metadata, engine
from routers import router

metadata.create_all(engine)

app = FastAPI()


origins = ['http://localhost']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/media", StaticFiles(directory="media"), name="media")
app.include_router(router)


@app.get('/')
def root():
    return {"message": "hello"}

@app.on_event("startup")
async def startup():
    # init_db()
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()