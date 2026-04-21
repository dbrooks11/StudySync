from app.db import pool
from datetime import datetime
from psycopg.rows import dict_row
from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

profile_bp = Blueprint('profile', __name__ , url_prefix='/profile')

@profile_bp.route('/me', methods = ['GET'])
@jwt_required()
def profile():
    id = get_jwt_identity()

    try:
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as cur:
                info = cur.execute("""
                    SELECT first_name, last_name, email, major, gpa 
                    FROM Student 
                    WHERE student_id = %s
                """, (id,)).fetchone()

                if not info:
                    return jsonify({'error': 'User not found'}), 404

                availability = cur.execute("""
                    SELECT avail_id, day_of_week, start_time::text, end_time::text FROM availability 
                    WHERE student_id = %s
                """, (id,)).fetchall()
        return jsonify({'profile': {
            'info': info,
            'availability': availability
        }}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@profile_bp.route('/availability/add', methods = ['POST'])
@jwt_required()
def add_availability():
    id = get_jwt_identity()

    day = request.form.get("day")
    start_time = request.form.get("start_time")
    end_time = request.form.get("end_time")

    try:
        format = '%H:%M'
        valid_start = datetime.strptime(start_time, format).time()
        valid_end = datetime.strptime(end_time, format).time()
    
        if not all([day, start_time, end_time]) or day not in ['Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] or not valid_start or not valid_end or (valid_start >= valid_end):
            return jsonify({'error': 'Invalid date or time'}), 422
    
    
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as cur:
                availability_exist = cur.execute("""
                                                 SELECT day_of_week FROM availability 
                                                 WHERE student_id = %s AND day_of_week = %s
                                                 """, (id, day,)).fetchone()

                if availability_exist:
                    return jsonify({'error': 'Availability already set'}), 409
                
                cur.execute("""
                            INSERT INTO availability(student_id, day_of_week, start_time, end_time) 
                            VALUES(%s, %s, %s, %s)
                            """, (id,day, start_time, end_time))

                availabilites = cur.execute("""
                                            SELECT avail_id, day_of_week, start_time::text, end_time::text 
                                            FROM availability 
                                            WHERE student_id = %s
                                            """, (id,)).fetchall()

                return jsonify({'message': 'Availability added successfully',
                            'availabilities': availabilites}), 201
    except ValueError:
        return jsonify({'error': 'Invalid time format'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@profile_bp.route('/availability/delete/<int:avail_id>/<string:day>', methods = ['DELETE'])
@jwt_required()
def delete_availability(avail_id, day):
    id = get_jwt_identity()

    if not avail_id or not day:
        return jsonify({'error':'Invalid availability data'}), 400

    try:
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as cur:
                cur.execute("""DELETE FROM availability 
                            WHERE student_id = %s AND avail_id = %s AND 
                            day_of_week = %s
                            """, (id, avail_id, day,))

                availabilites = cur.execute("""
                                            SELECT avail_id, day_of_week, start_time::text, end_time::text 
                                            FROM availability 
                                            WHERE student_id = %s""", (id,)).fetchall()

            return jsonify({'message': 'Availability removed successfully',
                            'availabilities': availabilites}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@profile_bp.route('/course-list/add', methods = ['POST'])
@jwt_required()
def add_course_list():

    course_code = request.form.get('course_code', '').strip().upper()
    course_name = request.form.get('course_name', '').strip()
    department = request.form.get('department', '').strip()
    credit_hours = request.form.get('credit_hours', '')

    if credit_hours:
        credit_hours = int(credit_hours)

    if not course_code:
        return jsonify({'error':'Invalid course data'}), 400

    try:
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as cur:
                course_exist = cur.execute("""
                                           SELECT * 
                                           FROM course
                                           WHERE course_code = %s
                                           """, (course_code,)).fetchone()
                if course_exist:
                   return jsonify({'error':'Course already exist'}), 409
                
                cur.execute("""
                        INSERT INTO course(course_code, course_name, department, credits) 
                        VALUES(%s, %s, %s, %s) 
                        """, (course_code, course_name, department, credit_hours,))
                courses = cur.execute("""
                                        SELECT * 
                                        FROM course
                                        """).fetchall()
                return jsonify({'message': 'Course added to list successfully',
                            'course_list': courses}), 201 
    except ValueError:
        return jsonify({'error': 'Invalid data'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@profile_bp.route('/courses', methods = ["GET"])
@jwt_required()
def get_courses():
    id = get_jwt_identity()

    try:
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as cur:
                course_list = cur.execute("""
                                            SELECT *
                                            FROM course
                                            """).fetchall()
                enrolled_courses = cur.execute("""
                                                SELECT *
                                                FROM course as c
                                                JOIN Enrollment as e ON e.course_id = c.course_id
                                                JOIN Student as s ON s.student_id = e.student_id
                                                WHERE s.student_id = %s
                                            """, (id,)).fetchall()
                
                return jsonify({'course_list': course_list,
                                'enrolled_courses': enrolled_courses}),200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@profile_bp.route('/course/add', methods = ['POST'])
@jwt_required()
def add_course():
    id = get_jwt_identity()
    data = request.get_json()
    course_code = data.get('course_code')
    course_id = data.get('course_id')

    if not all([course_code, course_id]):
        return jsonify({'error':'Invalid course data'}), 400

    try:
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as cur:
                course_exist = cur.execute(""" 
                                          SELECT c.course_id
                                          FROM course as c
                                          JOIN Enrollment as e ON e.course_id = c.course_id
                                          JOIN Student as s ON s.student_id = e.student_id
                                          WHERE s.student_id = %s AND c.course_code = %s AND c.course_id = %s 
                                          """, (id, course_code, course_id,)).fetchone()
               
                if course_exist:
                   return jsonify({'error':'Youre already enrolled in this course'}), 409
                
                cur.execute("""
                            INSERT INTO enrollment(student_id, course_id)
                            VALUES(%s, %s)
                            """, (id, course_id,))
                
                enrolled_courses = cur.execute("""
                    SELECT * FROM course as c
                    JOIN Enrollment as e ON c.course_id = e.course_id
                    WHERE e.student_id = %s
                """, (id,)).fetchall()

                return jsonify({'message': 'Course added successfully',
                                'enrolled_courses': enrolled_courses}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@profile_bp.route('/course/delete/<int:course_id>/<string:course_code>', methods = ['DELETE'])
@jwt_required()
def delete_course(course_id, course_code):
    id = get_jwt_identity()

    if not all([course_id, course_code]):
        return jsonify({'error':'Invalid course data'}), 400

    try:
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as cur:
                course_exist = cur.execute(""" 
                                          SELECT c.course_id
                                          FROM course as c
                                          JOIN Enrollment as e ON e.course_id = c.course_id
                                          JOIN Student as s ON s.student_id = e.student_id
                                          WHERE s.student_id = %s AND c.course_code = %s AND c.course_id = %s 
                                          """, (id, course_code, course_id,)).fetchone()
               
                if course_exist:
                   cur.execute("""
                               DELETE FROM enrollment
                               WHERE student_id = %s AND course_id = %s
                               """, (id, course_id,))
                   
                   enrolled_courses = cur.execute("""
                    SELECT * FROM course as c
                    JOIN Enrollment as e ON c.course_id = e.course_id
                    WHERE e.student_id = %s
                """, (id,)).fetchall()

                return jsonify({'message': 'Course removed successfully',
                                'enrolled_courses': enrolled_courses}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500            