# FILE			: order_model.py
# PROJECT		: SENG3080 - AWF :: Group Project
# LAST VERSION  : 2023-04-13
# DESCRIPTION	: This is a database model to represent Order entity

from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from ..db_setup import Base
from .mixins import Timestamp


class Order(Base, Timestamp):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    book_id = Column(Integer, ForeignKey("books.id"))
    checkout_date = Column(DateTime(timezone=True), nullable=False, server_default=None)
    final_return_date = Column(DateTime(timezone=True), nullable=False, server_default=None)
    returned_date = Column(DateTime(timezone=True), nullable=True, server_default=None)
    is_returned = Column(Boolean, nullable=False, default=False)

    user = relationship("User", back_populates="orders")
    book = relationship("Book", back_populates="orders")

    def __init__(self, user_id, book_id, checkout_date, final_return_date, returned_date, is_returned):
        super(Order, self).__init__()
        self.user_id = user_id
        self.book_id = book_id
        self.checkout_date = checkout_date
        self.final_return_date = final_return_date
        self.returned_date = returned_date
        self.is_returned = is_returned
