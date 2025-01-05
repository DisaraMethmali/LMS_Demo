from app.models.base import BaseModel
from app import db

class Course(BaseModel):
    __tablename__ = 'courses'
    subject = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    instructor_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    is_active = db.Column(db.Boolean, default=True)

    