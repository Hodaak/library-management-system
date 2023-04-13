# FILE			: main.py
# PROJECT		: SENG3080 - AWF :: Group Project
# LAST VERSION  : 2023-04-13
# DESCRIPTION	: This acts as the point of execution for this project which binds database models and routers.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from database.db_setup import engine
from database.db_models import user_model, book_model, order_model
from routers import user_router, authentication_router, book_router, order_router

# Bind models
user_model.Base.metadata.create_all(bind=engine)
book_model.Base.metadata.create_all(bind=engine)
order_model.Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME,
              description=settings.PROJECT_DESCRIPTION,
              version=settings.PROJECT_VERSION)
# add CORS middleware to allow communication between frontend and backend that has different origins
origins = [
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user_router.router)
app.include_router(authentication_router.router)
app.include_router(book_router.router)
app.include_router(order_router.router)


@app.get("/")
async def root():
    return {"message": "Welcome to Library Management System!"}
