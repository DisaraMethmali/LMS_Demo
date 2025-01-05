from flask import Blueprint, request
from app.models.course import Course
from app.controllers.course_controller import CourseController
from flask_jwt_extended import jwt_required, get_jwt
from app.utils.decorators import admin_required
from app.schemas.course_schema import CourseSchema
from marshmallow import ValidationError

course_bp = Blueprint('course', __name__)

@course_bp.route('/courses', methods=['POST'])
@jwt_required()
@admin_required()
def create_course():
   try:
       data = CourseSchema().load(request.get_json())
       return CourseController.create_course(data)
   except ValidationError as err:
       return {'message': err.messages}, 400

@course_bp.route('/courses', methods=['GET'])
@jwt_required()
def get_courses():
   return CourseController.get_all_courses()

@course_bp.route('/courses/<int:course_id>', methods=['GET'])
@jwt_required()
def get_course(course_id):
   return CourseController.get_course(course_id)

@course_bp.route('/courses/<int:course_id>', methods=['PUT'])
@jwt_required()
@admin_required()
def update_course(course_id):
   try:
       data = CourseSchema().load(request.get_json(), partial=True)
       return CourseController.update_course(course_id, data)
   except ValidationError as err:
       return {'message': err.messages}, 400

@course_bp.route('/courses/<int:course_id>', methods=['DELETE'])
@jwt_required()
@admin_required()
def delete_course(course_id):
   return CourseController.delete_course(course_id)

@course_bp.route('/courses/count', methods=['GET'])
@jwt_required()
def get_course_count():
    return CourseController.get_course_count()
