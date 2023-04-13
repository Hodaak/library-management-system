# FILE			: user_model.py
# PROJECT		: SENG3080 - AWF :: Group Project
# LAST VERSION  : 2023-04-13
# DESCRIPTION	: This is a database model to represent User entity

from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from ..db_setup import Base
from .mixins import Timestamp


class User(Base, Timestamp):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(45), nullable=False)
    last_name = Column(String(45), nullable=False)
    email = Column(String(45), nullable=False, unique=True)
    username = Column(String(45), nullable=False, unique=True)
    is_admin = Column(Boolean, nullable=False, default=False)
    hashed_password = Column(String(65), nullable=False)

    orders = relationship("Order", back_populates="user")

    def __init__(self, first_name, last_name, email, username, is_admin, hashed_password):
        super(User, self).__init__()
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.username = username
        self.is_admin = is_admin
        self.hashed_password = hashed_password
