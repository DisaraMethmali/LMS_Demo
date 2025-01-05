import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY','L7oOTlh76xCW2ouJpGFzcrFq05zKomJM')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', "mysql+pymysql://root:Meth*2001@localhost:3306/lms_db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY','UnfZ0b4fCyL3gz1FOrqWuph4PA34IVNzAbYSvRt4VtU=')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)