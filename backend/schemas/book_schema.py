from datetime import datetime
from pydantic import BaseModel


class BoookBase(BaseModel):
    book_id: str
    title: str
    author_name: str
    quantity: int


class BookCreate(BoookBase):
    pass


class Book(BoookBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
