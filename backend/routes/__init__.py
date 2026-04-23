from .auth import auth_bp
from .profile import profile_bp
from .group import group_bp
from .course import course_bp

routes = [
    auth_bp,
    profile_bp,
    group_bp,
    course_bp,
    
]

def register_blueprints(app):
    for route in routes:
        app.register_blueprint(route)