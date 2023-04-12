from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from database.db_models.book_model import Book
from database.db_models.order_model import Order
from schemas import book_schema


def get_book_by_id(db: Session, id: int):
    return db.query(Book).filter(Book.id == id).first()

def get_all_books(db: Session, limit: int = 100):
    return db.query(Book).limit(limit).all()

def get_books_by_author(db: Session, author_name: str):
    return db.query(Book).filter(Book.author_name == author_name).all()

def get_book_by_title(db: Session, title: int):
    return db.query(Book).filter(Book.title == title).first()


def decrease_book_quantity_by_one(db: Session, id: int):
    db_book = db.query(Book).filter(Book.id == id).first()
    if db_book is None:
        return None
    quantity = db_book.quantity
    db_book.quantity = quantity-1
    db.commit()
    db.refresh(db_book)


def increase_book_quantity_by_one(db: Session, id: int):
    db_book = db.query(Book).filter(Book.id == id).first()
    if db_book is None:
        return None
    quantity = db_book.quantity
    db_book.quantity = quantity+1
    db.commit()
    db.refresh(db_book)


# def delete_book_by_id(db: Session, book_id: int):
#     existing_user = db.query(Book).filter(Book.id == user_id)
#     if not existing_user.first():
#         return False
#     existing_user.delete()
#     db.commit()


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
        db_book = get_book_by_id(db=db, id=id)
        if db_book is None:
            print("\nBook doesn't exist with id: ", id)
            return None

        db_book.book_id=book.book_id
        db_book.title=book.title
        db_book.author_name=book.author_name
        count = db.query(Order).filter(Order.book_id == id, Order.is_returned == 0).count()
        quantity = book.quantity

        if quantity < 0:
            quantity = 0
        if quantity < count:
            quantity = count
        
        print("Count ", count)
        print("QUan ", quantity)
        db_book.quantity=quantity
        
        db.commit()
        db.refresh(db_book)
        return db_book
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nHandled Exception: Trying to create a new book with duplicate book id\n"
              "Error Args:" + str(error.args))
        return None
    