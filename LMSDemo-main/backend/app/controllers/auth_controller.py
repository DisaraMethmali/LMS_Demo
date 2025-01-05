from app.models.user import User
from app import db
from flask_jwt_extended import create_access_token, get_jwt_identity
from app.schemas.auth_schema import UserSchema


class AuthController:
    @staticmethod
    def register_user(data):
        try:
            user = User.query.filter((User.username == data['username']) | 
                                   (User.email == data['email'])).first()
            if user:
                return {'message': 'Username or email already exists'}, 400

            new_user = User(
                username=data['username'],
                email=data['email'],
                role=data.get('role', 'student'),
                nic=data.get('studentID'),
                address=data.get('address')
            )
            new_user.set_password(data['password'])
            
            db.session.add(new_user)
            db.session.commit()
            
            return {'message': 'User registered successfully'}, 201
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500

    @staticmethod
    def login_user(data):
        try:
            user = User.query.filter_by(username=data['username']).first()
            
            if not user or not user.check_password(data['password']):
                return {'message': 'Invalid credentials'}, 401

            access_token = create_access_token(
                identity=str(user.id),
                additional_claims={'role': user.role}
            )
            
            return {
                'access_token': access_token,
                'user': UserSchema().dump(user)
            }, 200
        except Exception as e:
           db.session.rollback()
           return {'message': str(e)}, 500

    @staticmethod
    def get_current_user():
        try:
            user_id = get_jwt_identity()
            user = User.query.get(user_id)
            
            if not user:
                return {'message': 'User not found'}, 404

            return UserSchema().dump(user), 200
        except Exception as e:
            return {'message': str(e)}, 500