from marshmallow import Schema, fields, validate

class CourseSchema(Schema):
   id = fields.Int(dump_only=True)
   subject = fields.Str(required=True, validate=validate.Length(min=3))
   description = fields.Str()
   instructor_id = fields.Int(required=True)
   created_at = fields.DateTime(dump_only=True)
   is_active = fields.Bool()