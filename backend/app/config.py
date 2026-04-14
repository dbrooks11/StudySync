import os
from datetime import timedelta

from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JSON_SORT_KEYS = False

    # JWT Core
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=5)
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_COOKIE_CSRF_PROTECT = False

class DevelopmentConfig(Config):
    DEBUG = True
    DEBUG_TB_ENABLED = True

config_dict = {
    'development': DevelopmentConfig
}