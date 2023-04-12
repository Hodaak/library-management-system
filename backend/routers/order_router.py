import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.db_setup import get_db
from database.db_models.user_model import User
from schemas import order_schema
from services import authentication_service, order_service

router = fastapi.APIRouter(
    prefix="/order",
    tags=["orders"]
)


@router.get("/", response_model=list[order_schema.Order])
async def retrieve_all_orders(limit: int = 100,
                             db: Session = Depends(get_db),
                             current_user: User = Depends(authentication_service.get_current_user_from_token)):

    if current_user.is_admin is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")
    return order_service.get_all_orders(db=db, limit=limit)


@router.get("/{user_id}", response_model=list[order_schema.Order])
async def retrieve_all_orders_for_user(user_id: int,
                                       limit: int = 100,
                                       db: Session = Depends(get_db),
                                       current_user: User = Depends(authentication_service.get_current_user_from_token)):

    if user_id != current_user.id and current_user.is_admin is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")
    return order_service.get_all_orders(db=db, limit=limit)


@router.post("/", response_model=order_schema.Order)
async def create_new_order(order: order_schema.OrderCreate,
                          db: Session = Depends(get_db),
                          current_user: User = Depends(authentication_service.get_current_user_from_token)):
    
    if current_user.is_admin is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")
    
    db_order = order_service.place_order(db=db, order=order)
    if db_order is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Book doesn't exits, so can't place order")
    return db_order


@router.post("/return/{order_id}", response_model=order_schema.Order)
async def return_order(order_id: int,
                       db: Session = Depends(get_db),
                       current_user: User = Depends(authentication_service.get_current_user_from_token)):
    
    if current_user.is_admin is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")
    
    db_order = order_service.return_order(db=db, order_id=order_id)
    if db_order is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Order doesn't exit, so can't retrun order")
    return db_order
