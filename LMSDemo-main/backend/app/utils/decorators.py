from functools import wraps
from flask_jwt_extended import get_jwt
from flask import jsonify

def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            claims = get_jwt()
            if claims.get('role') != 'admin':
                return jsonify({'message': 'Admin access required'}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper