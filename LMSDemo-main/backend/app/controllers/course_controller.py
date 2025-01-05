from flask import jsonify
from app.models.course import Course
from app.schemas.course_schema import CourseSchema
from app import db

class CourseController:
    @staticmethod
    def create_course(data):
        try:
            course = Course(**data)
            db.session.add(course)
            db.session.commit()
            return CourseSchema().dump(course), 201
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 400

    @staticmethod
    def get_all_courses():
        courses = Course.query.filter_by(is_active=True).all()
        return jsonify(CourseSchema(many=True).dump(courses)), 200

    @staticmethod
    def get_course(course_id):
        course = Course.query.get_or_404(course_id)
        return CourseSchema().dump(course), 200

    @staticmethod
    def update_course(course_id, data):
        course = Course.query.get_or_404(course_id)
        for key, value in data.items():
            setattr(course, key, value)
        db.session.commit()
        return CourseSchema().dump(course), 200

    @staticmethod
    def delete_course(course_id):
        course = Course.query.get_or_404(course_id)
        course.is_active = False
        db.session.commit()
        return '', 204

    @staticmethod
    def get_course_count():
        course_count = Course.query.filter_by(is_active=True).count()  # Counting active courses
        return jsonify({'count': course_count}), 200    