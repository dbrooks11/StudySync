from .auth import auth_bp
from .profile import profile_bp

routes = [
    auth_bp,
    profile_bp,
    
]

def register_blueprints(app):
    for route in routes:
        app.register_blueprint(route)