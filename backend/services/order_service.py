from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from database.db_models.order_model import Order
from schemas import order_schema
from datetime import datetime
from services import book_service


def get_order_by_id(db: Session, order_id: int):
    return db.query(Order).filter(Order.id == order_id).first()


def get_all_orders(db: Session, limit: int = 100):
    return db.query(Order).limit(limit).all()


def get_all_orders_for_user(db: Session, user_id: int):
    return db.query(Order).filter(Order.user_id == user_id).all()


def place_order(db: Session, order: order_schema.OrderCreate):
    try:
        db_book = book_service.get_book_by_id(db=db, id=order.book_id)
        if db_book is None:
            print("Book doesn't exist, so can't place the order")
            return None

        db_order = Order(user_id=order.user_id,
                         book_id=order.book_id,
                         checkout_date=order.checkout_date,
                         final_return_date=order.final_return_date,
                         returned_date=order.returned_date,
                         is_returned=False)
        db.add(db_order)
        db.commit()
        db.refresh(db_order)
        book_service.decrease_book_quantity_by_one(db=db, id=order.book_id)
        return db_order
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nHandled Exception: Trying to create a new order\n"
              "Error Args:" + str(error.args))
        return None


def return_order(db: Session, order_id: int):
    try:
        db_order = get_order_by_id(db=db, order_id=order_id)
        if db_order is None:
            print("\Order doesn't exist with id: ", order_id)
            return None

        db_order.returned_date = datetime.now()
        db_order.is_returned = True
        
        db.commit()
        db.refresh(db_order)
        book_service.increase_book_quantity_by_one(db=db, id=db_order.book_id)
        return db_order
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nHandled Exception: Trying to return an order\n"
                "Error Args:" + str(error.args))
        return None
