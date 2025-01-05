from marshmallow import Schema, fields

class EnrollmentSchema(Schema):
    id = fields.Int(dump_only=True)
    subject = fields.Str(required=True)
    description = fields.Str()
    instructor_id = fields.Int()
    created_at = fields.DateTime(dump_only=True)
    is_active = fields.Bool()