from flask import Blueprint, request
from app.controllers.enrollment_controller import EnrollmentController
from flask_jwt_extended import jwt_required

enrollment_bp = Blueprint('enrollment', __name__)


@enrollment_bp.route('/enrollments/<int:course_id>', methods=['POST'])
@jwt_required()
def enroll_course(course_id):
   return EnrollmentController.enroll_course(course_id)


@enrollment_bp.route('/enrollments', methods=['GET'])
@jwt_required()
def get_enrolled_courses():
   return EnrollmentController.get_enrolled_courses()

@enrollment_bp.route('/enrollment/count', methods=['GET'])
@jwt_required()
def get_enrolled_course_count():
    return EnrollmentController.get_enrolled_course_count()

 
