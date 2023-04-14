# FILE			: order_schema.py
# PROJECT		: SENG3080 - AWF :: Group Project
# LAST VERSION  : 2023-04-13
# DESCRIPTION	: This is a pydantic schema to use for API communication for order

from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from schemas.user_schema import User
from schemas.book_schema import Book


class OrderBase(BaseModel):
    pass


class OrderCreate(OrderBase):
    book_id: int


class Order(OrderBase):
    id: int
    user: User
    book: Book
    is_returned: bool
    checkout_date: datetime
    final_return_date: datetime
    returned_date: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
