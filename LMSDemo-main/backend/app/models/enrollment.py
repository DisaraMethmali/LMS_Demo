from app.models.base import BaseModel
from app import db


class Enrollment(BaseModel):
    __tablename__ = 'enrollments'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    user = db.relationship('User', backref='enrollments', lazy=True)
    course = db.relationship('Course', backref='enrollments', lazy=True)