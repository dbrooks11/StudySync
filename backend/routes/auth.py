from db import pool
from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash

auth_bp = Blueprint("auth",__name__, url_prefix="auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    first_name = request.form.get('first_name')
    last_name = request.form.get("last_name")
    email = request.form.get('email')
    password = request.form.get('password')
    major = request.form.get('major')
    gpa = request.form.get('gpa')

    try:
        if not (first_name or last_name or email or password or major or gpa):
            return jsonify({"error": "Please complete the form"}), 400

        gpa = float(gpa)
        
        if (0.0 < gpa < 5.0) is False:
            return jsonify({'error': 'GPA must be between 0.0 and 5.0'}), 422
        

        password_encrypted = generate_password_hash(password)

        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute("INSERT INTO student('first_name','last_name', 'email', 'password_hash', 'major', 'gpa') VALUES(?,?,?,?,?)", first_name, last_name, email, password_encrypted, major, gpa)
            
        return jsonify({'message': 'Registration Successful'}), 201
    except Exception as e:
        print(e)