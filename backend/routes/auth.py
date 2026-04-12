from app.db import pool
from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint("auth",__name__, url_prefix="/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    first_name = request.form.get('first_name')
    last_name = request.form.get("last_name")
    email = request.form.get('email')
    password = request.form.get('password')
    major = request.form.get('major')
    gpa = request.form.get('gpa')

    try:
        if not all([first_name, last_name, email, password, major, gpa]):
            return jsonify({"error": "Please complete the form"}), 400

        gpa = float(gpa)
        
        if not (0.0 <= gpa <= 5.0):
            return jsonify({'error': 'GPA must be between 0.0 and 5.0'}), 422

        password_encrypted = generate_password_hash(password)

        with pool.connection() as conn:
            with conn.cursor() as cur:
                email_exist = cur.execute("SELECT student_id FROM student WHERE email = %s", (email,)).fetchone()
                if email_exist:
                    return jsonify({'error': 'Email already exist'}), 409
                cur.execute("INSERT INTO student(first_name,last_name, email, password_hash, major, gpa) VALUES(%s, %s, %s, %s, %s, %s)", (first_name, last_name, email, password_encrypted, major, gpa,))
            
        return jsonify({'message': 'Registration Successful'}), 201
    except ValueError:
        return jsonify({'error': 'GPA must be a number'}), 422
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth_bp.route('/login', methods=['GET'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')

    if not all([email, password]):
        return jsonify({'error': 'Please enter an email and password'}), 400

    try:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                password_hash = cur.execute('SELECT password_hash FROM student WHERE email = %s', (email,)).fetchone()

        login = check_password_hash(password_hash[0], password)

        if not login:
            return jsonify({'error': 'Invalid email or password'}), 401
        return jsonify({'message':'Login Successful'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500