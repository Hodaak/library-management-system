# FILE			: book_service.py
# PROJECT		: SENG3080 - AWF :: Group Project
# LAST VERSION  : 2023-04-13
# DESCRIPTION	: This is a service class to handle business logic for book

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from database.db_models.book_model import Book
from database.db_models.order_model import Order
from schemas import book_schema


def get_book_by_id(db: Session, book_id: int):
    return db.query(Book).filter(Book.id == book_id).first()


def get_all_books(db: Session, limit: int = 100):
    return db.query(Book).limit(limit).all()


def get_books_by_author(db: Session, author_name: str):
    return db.query(Book).filter(Book.author_name == author_name).all()


def get_book_by_title(db: Session, title: str):
    return db.query(Book).filter(Book.title == title).first()


def decrease_book_quantity_by_one(db: Session, book_id: int):
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if db_book is None:
        return None
    quantity = db_book.quantity
    if quantity <= 0:
        db_book.quantity = 0
    else:
        db_book.quantity = quantity - 1

    db.commit()
    db.refresh(db_book)


def increase_book_quantity_by_one(db: Session, book_id: int):
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if db_book is None:
        return None
    quantity = db_book.quantity
    db_book.quantity = quantity + 1
    db.commit()
    db.refresh(db_book)


def delete_book_by_id(db: Session, book_id: int):
    existing_book = db.query(Book).filter(Book.id == book_id).first()
    if existing_book is None:
        return False

    count = db.query(Order).filter(Order.book_id == book_id, Order.is_returned == 0).count()
    if count > 0:
        return False
    db.delete(existing_book)
    db.commit()


def create_book(db: Session, book: book_schema.BookCreate):
    try:
        db_book = Book(book_id=book.book_id,
                       title=book.title,
                       author_name=book.author_name,
                       quantity=book.quantity)
        db.add(db_book)
        db.commit()
        db.refresh(db_book)
        return db_book
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nHandled Exception: Trying to create a new book with duplicate book id\n"
              "Error Args:" + str(error.args))
        return None


def update_book(db: Session, book: book_schema.BookCreate, id: int):
    try:
        db_book = get_book_by_id(db=db, book_id=id)
        if db_book is None:
            print("\nBook doesn't exist with id: ", id)
            return None

        db_book.book_id = book.book_id
        db_book.title = book.title
        db_book.author_name = book.author_name
        count = db.query(Order).filter(Order.book_id == id, Order.is_returned == 0).count()
        quantity = book.quantity

        if quantity < 0:
            quantity = 0
        if quantity < count:
            quantity = count

        db_book.quantity = quantity

        db.commit()
        db.refresh(db_book)
        return db_book
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nHandled Exception: Trying to create a new book with duplicate book id\n"
              "Error Args:" + str(error.args))
        return None
