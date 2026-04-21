from .auth import auth_bp
from .groups import groups_bp


routes = [
    auth_bp,
    groups_bp,
]

def register_blueprints(app):
    for route in routes:
        app.register_blueprint(route)