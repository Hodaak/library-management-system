from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from schemas.user_schema import User
from schemas.book_schema import Book


class OrderBase(BaseModel):
    checkout_date: datetime
    final_return_date: datetime
    returned_date: Optional[datetime] = None


class OrderCreate(OrderBase):
    user_id: int
    book_id: int


class Order(OrderBase):
    id: int
    user: User
    book: Book
    is_returned: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
