from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from app.config import Config
from flask_jwt_extended import create_access_token

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()
ma = Marshmallow()
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    CORS(app)
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)

    from app.routes.auth_routes import auth_bp
    from app.routes.course_routes import course_bp
    from app.routes.enrollment_routes import enrollment_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(course_bp, url_prefix='/api')
    app.register_blueprint(enrollment_bp, url_prefix='/api')

    return app