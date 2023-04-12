import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.db_setup import get_db
from database.db_models.user_model import User
from schemas import book_schema
from services import authentication_service, book_service

router = fastapi.APIRouter(
    prefix="/book",
    tags=["books"]
)


@router.get("/id/{book_id}", response_model=book_schema.Book)
async def retrieve_book_by_id(book_id: int,
                              db: Session = Depends(get_db),
                              current_user: User = Depends(authentication_service.get_current_user_from_token)):

    db_book = book_service.get_book_by_id(db=db, id=book_id)
    if db_book is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
    return db_book


@router.get("/title/{title}")
async def retrieve_book_by_title(title: str,
                                db: Session = Depends(get_db),
                                current_user: User = Depends(authentication_service.get_current_user_from_token)):

    db_book = book_service.get_book_by_title(db=db, title=title)
    if db_book is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
    return db_book


@router.get("/author/{author_name}", response_model=list[book_schema.Book])
async def retrieve_books_by_author_name(author_name: str,
                              db: Session = Depends(get_db),
                              current_user: User = Depends(authentication_service.get_current_user_from_token)):

    db_book = book_service.get_books_by_author(db=db, author_name=author_name)
    if db_book is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
    return db_book


@router.get("/", response_model=list[book_schema.Book])
async def retrieve_all_books(limit: int = 100,
                             db: Session = Depends(get_db),
                             current_user: User = Depends(authentication_service.get_current_user_from_token)):

    return book_service.get_all_books(db=db, limit=limit)


@router.post("/", response_model=book_schema.Book)
async def create_new_book(book: book_schema.BookCreate,
                          db: Session = Depends(get_db),
                          current_user: User = Depends(authentication_service.get_current_user_from_token)):
    
    if current_user.is_admin is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")
    
    db_book = book_service.create_book(db=db, book=book)
    if db_book is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Book with this id already exists")
    return db_book


@router.put("/{book_id}", response_model=book_schema.Book)
async def update_book_by_id(book_id: int,
                            book: book_schema.BookCreate,
                          db: Session = Depends(get_db),
                          current_user: User = Depends(authentication_service.get_current_user_from_token)):
    
    if current_user.is_admin is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")
    
    db_book = book_service.update_book(db=db, book=book, id=book_id)
    if db_book is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Book doesn't exist or trying to use duplicate book id")
    return db_book

# @router.delete("/{user_id}")
# def delete_user(user_id: int,
#                 db: Session = Depends(get_db),
#                 current_user: User = Depends(authentication_service.get_current_user_from_token)):

#     if user_id != current_user.id and current_user.is_super_user is False:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")

#     db_user = user_service.delete_user_by_id(db=db, user_id=user_id)
#     if db_user is False:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found, so cannot be deleted")
#     return {"message": "Successfully deleted."}
