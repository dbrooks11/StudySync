from app.db import pool
from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from psycopg.rows import dict_row

course_bp = Blueprint("courses", __name__, url_prefix='/courses')


@course_bp.route('/course-list/add', methods = ['POST'])
@jwt_required()
def add_course_list():

    course_code = request.form.get('course_code', '').strip().upper()
    course_name = request.form.get('course_name', '').strip()
    department = request.form.get('department', '').strip()
    credit_hours = request.form.get('credit_hours', '')

    try:
        if credit_hours:
            credit_hours = int(credit_hours)

        if not course_code:
            return jsonify({'error':'Invalid course data'}), 400

    
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
    

@course_bp.route('/all', methods = ["GET"])
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
    
    
@course_bp.route('/enroll', methods = ['POST'])
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
    
    
@course_bp.route('/enroll/delete/<int:course_id>/<string:course_code>', methods = ['DELETE'])
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