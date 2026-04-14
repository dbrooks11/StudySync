from .auth import auth_bp


routes = [
    auth_bp,
]

def register_blueprints(app):
    for route in routes:
        app.register_blueprint(route)