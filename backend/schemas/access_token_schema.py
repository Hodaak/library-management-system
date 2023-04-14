# FILE			: access_token_schema.py
# PROJECT		: SENG3080 - AWF :: Group Project
# LAST VERSION  : 2023-04-13
# DESCRIPTION	: This is a pydantic schema to use for API communication for access token

from pydantic import BaseModel


class AccessToken(BaseModel):
    access_token: str
    token_type: str
    is_admin: bool
