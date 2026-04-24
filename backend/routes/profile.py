from datetime import datetime

from app.db import pool
from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from psycopg.rows import dict_row

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


@profile_bp.route('/edit', methods = ['PATCH'])
@jwt_required()
def edit_profil():
    id = get_jwt_identity()
    email = request.form.get('email', '')
    major = request.form.get('major', '')
    gpa = request.form.get('gpa', '')

    try:
        if gpa:
            gpa = float(gpa)
        
            if not (0.0 <= gpa <= 5.0):
                return jsonify({'error': 'GPA must be between 0.0 and 5.0'}), 422

        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as cur:
                if email:
                    cur.execute("""
                        UPDATE student
                        SET email = %s 
                        WHERE student_id = %s
                        """, (email,id,))
                
                if major:
                    cur.execute("""
                        UPDATE student
                        SET major = %s 
                        WHERE student_id = %s
                        """, (major,id,))
                
                if gpa:
                    cur.execute("""
                        UPDATE student
                        SET gpa = %s 
                        WHERE student_id = %s
                        """, (gpa,id,))
            
                updated_profile = cur.execute("""
                                            SELECT email, major, gpa
                                            FROM student
                                            WHERE student_id = %s
                                            """,(id,)).fetchone()
        
        return jsonify({'message': 'Updated Profile Successfully',
                        'profile': updated_profile}), 200
    except ValueError:
        return jsonify({'error': 'GPA must be a number'}), 422
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

                availabilities = cur.execute("""
                                            SELECT avail_id, day_of_week, start_time::text, end_time::text 
                                            FROM availability 
                                            WHERE student_id = %s
                                            """, (id,)).fetchall()

                return jsonify({'message': 'Availability added successfully',
                            'availabilities': availabilities}), 201
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

                availabilities = cur.execute("""
                                            SELECT avail_id, day_of_week, start_time::text, end_time::text 
                                            FROM availability 
                                            WHERE student_id = %s""", (id,)).fetchall()

            return jsonify({'message': 'Availability removed successfully',
                            'availabilities': availabilities}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
                