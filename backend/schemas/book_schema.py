# FILE			: book_schema.py
# PROJECT		: SENG3080 - AWF :: Group Project
# LAST VERSION  : 2023-04-13
# DESCRIPTION	: This is a pydantic schema to use for API communication for book

from datetime import datetime
from pydantic import BaseModel


class BookBase(BaseModel):
    book_id: str
    title: str
    author_name: str
    quantity: int


class BookCreate(BookBase):
    pass


class Book(BookBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
