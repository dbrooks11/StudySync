import os
from flask import Flask
from config import config_dict
from flask_cors import CORS




def create_app(config_name=None):
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')

    app = Flask(__name__)
    app.config.from_object(config_dict[config_name])

    configure_security(app)

    with app.app_context():
        @app.route('/')
        def health_check():
            return {
            'status': 'healthy', 
            'message': 'StudySync API is running', 
            'env': config_name
        } 
    
    return app


def configure_security(app):
    origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
    origins.append("null")

    CORS(app, 
         origins=origins,
         supports_credentials=True,
         allow_headers=["Content-Type", "X-CSRF-TOKEN", "X-CSRF-Token", "x-csrf-token"],
         methods=["GET", "POST", "PUT", "DELETE", "PATCH"])

