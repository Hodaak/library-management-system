from sqlalchemy import Column, Integer, String

from ..db_setup import Base
from .mixins import Timestamp


class Book(Base, Timestamp):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(String(45), nullable=False, unique=True)
    title = Column(String(45), nullable=False)
    author_name = Column(String(45), nullable=False)
    quantity = Column(Integer, nullable=False)

    def __init__(self, book_id, title, author_name, quantity):
        super(Book, self).__init__()
        self.book_id = book_id
        self.title = title
        self.author_name = author_name
        self.quantity = quantity
