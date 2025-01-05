from flask import Blueprint, request
from app.controllers.auth_controller import AuthController
from flask_jwt_extended import jwt_required
from app.schemas.auth_schema import UserRegistrationSchema, UserLoginSchema
from marshmallow import ValidationError
from app.models.user import User
from flask import jsonify
from app.models.enrollment import Enrollment

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = UserRegistrationSchema().load(request.get_json())
        return AuthController.register_user(data)
    except ValidationError as err:
        return {'message': 'Validation error', 'errors': err.messages}, 400

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = UserLoginSchema().load(request.get_json())
        return AuthController.login_user(data)
    except ValidationError as err:
      return {'message': 'Validation error', 'errors': err.messages}, 400

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_user():
    return AuthController.get_current_user()

    

@auth_bp.route('/admins/count', methods=['GET'])
@jwt_required()
def get_admin_count():
    # Count only users with the 'admin' role
    admin_count = User.query.filter_by(role='admin').count()
    return {'count': admin_count}, 200
@auth_bp.route('/students/count', methods=['GET'])
@jwt_required()
def get_students_count():
    # Count only users with the 'admin' role
    students_count = User.query.filter_by(role='admin').count()
    return {'count': students_count}, 200
    
@auth_bp.route('/users', methods=['GET'])
@jwt_required()
def get_students():
    # Fetch only users with the 'student' role
    students = User.query.filter_by(role='student').all()  # Fetch students only
    
    # Prepare the response with the required fields for each student
    students_list = [{
        'id': student.id,
        'username': student.username,
        'email': student.email,
        'nic': student.nic,  # Include NIC
        'address': student.address,  # Include address
        'role': student.role  # Include role
    } for student in students]
    
    return jsonify({'users': students_list}), 200

@auth_bp.route('/enrollments', methods=['GET'])
@jwt_required()
def get_enrollments():
    # Fetch enrollments for all users (student-course relationships)
    enrollments = Enrollment.query.all()
    enrollment_list = [{
        'user_id': enrollment.user_id,
        'course_id': enrollment.course_id,
        'is_active': enrollment.is_active
    } for enrollment in enrollments]
    
    return jsonify(enrollment_list), 200
