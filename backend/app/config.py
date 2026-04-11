import os

from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JSON_SORT_KEYS = False


class DevelopmentConfig(Config):
    DEBUG = True
    DEBUG_TB_ENABLED = True

config_dict = {
    'development': DevelopmentConfig
}