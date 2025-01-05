from flask import jsonify
from app.models.enrollment import Enrollment
from app.models.course import Course
from app.schemas.enrollment_schema import EnrollmentSchema
from app import db
from flask_jwt_extended import get_jwt_identity

class EnrollmentController:
    @staticmethod
    def enroll_course(course_id):
       try:
         user_id = get_jwt_identity()
         if not user_id:
             return {'message': 'User not found'}, 404
         course = Course.query.get_or_404(course_id)

         existing_enrollment = Enrollment.query.filter_by(user_id=user_id, course_id=course_id).first()
         if existing_enrollment:
             return {'message': 'Already enrolled in this course'}, 400

         new_enrollment = Enrollment(user_id=user_id, course_id=course_id)
         db.session.add(new_enrollment)
         db.session.commit()
         return {'message': 'Successfully enrolled'}, 201
       except Exception as e:
           db.session.rollback()
           return {'message': str(e)}, 500


    @staticmethod
    def get_enrolled_courses():
        try:
            user_id = get_jwt_identity()
            enrollments = Enrollment.query.filter_by(user_id=user_id).all()
            enrolled_course_ids = [enrollment.course_id for enrollment in enrollments]
            enrolled_courses = Course.query.filter(Course.id.in_(enrolled_course_ids)).all()
            return jsonify(EnrollmentSchema(many=True).dump(enrolled_courses)), 200
        except Exception as e:
            return {'message': str(e)}, 500

    @staticmethod
    def get_enrolled_course_count():
        try:
            user_id = get_jwt_identity()
            enrolled_courses_count = Enrollment.query.filter_by(user_id=user_id).count()  # Count the number of enrollments
            return jsonify({'enrolled_course_count': enrolled_courses_count}), 200
        except Exception as e:
            return {'message': str(e)}, 500 

    