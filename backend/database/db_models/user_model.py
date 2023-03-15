from sqlalchemy import Boolean, Column, Integer, String

from ..db_setup import Base
from .mixins import Timestamp


class User(Base, Timestamp):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(45), nullable=False)
    last_name = Column(String(45), nullable=False)
    email = Column(String(45), nullable=False, unique=True)
    username = Column(String(45), nullable=False, unique=True)
    is_super_user = Column(Boolean, nullable=False, default=False)
    hashed_password = Column(String(65), nullable=False)

    def __init__(self, first_name, last_name, email, username, hashed_password):
        super(User, self).__init__()
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.username = username
        self.hashed_password = hashed_password