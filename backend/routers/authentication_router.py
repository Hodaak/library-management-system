# FILE			: authentication_router.py
# PROJECT		: SENG3080 - AWF :: Group Project
# LAST VERSION  : 2023-04-13
# DESCRIPTION	: This is a router that manages endpoints related to authentication

import fastapi
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.access_token_schema import AccessToken

from database.db_setup import get_db
from services import authentication_service

router = fastapi.APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post("/login/", response_model=AccessToken)
async def authenticate(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    auth_user = authentication_service.authenticate_user(db=db, username=form_data.username, password=form_data.password)
    if not auth_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

    access_token = authentication_service.create_access_token(data={"sub": auth_user.username})
    return {"access_token": access_token, "token_type": "bearer", "is_admin": auth_user.is_admin}
