from datetime import datetime

from app.db import pool
from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from psycopg.rows import dict_row

group_bp = Blueprint("groups", __name__, url_prefix='/groups')


@group_bp.route('/join/<int:group_id>', methods = ['POST'])
@jwt_required()
def join_group(group_id):
    id = get_jwt_identity()

    try:
        if not group_id:
            return jsonify({'error': 'Invalid study group'}), 400

        with pool.connection() as conn:
            with conn.cursor() as cur:
                group_exist = cur.execute("""
                                          SELECT group_id 
                                          FROM studygroup
                                          WHERE group_id = %s
                                          """,(group_id)).fetchone()
                
                if not group_exist:
                    return jsonify({'error': 'This group does not exist'}), 404
        
                cur.execute("""
                            INSERT INTO participating(student_id, group_id) 
                            VALUES(%s, %s)
                            """, (id, group_id))
    
        return jsonify({'message': 'Successfully joined study group'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@group_bp.route('/create', methods = ['POST'])
@jwt_required()
def create_group():
    id = get_jwt_identity()

    try:
        course_id = request.form.get('course_id')
        group_name = request.form.get('group_name')
        location = request.form.get('location')
        meeting_time = datetime.fromisoformat(request.form.get('meeting_time'))
        max_size = int(request.form.get('max_size'))

        if not all([course_id, group_name, location, meeting_time, max_size]):
            return jsonify({'error': 'Please complete the form'}), 400

        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                            INSERT INTO studygroup(course_id, host_id, group_name, location, meeting_time, max_size) 
                            VALUES(%s, %s, %s, %s, %s, %s)
                            """, (course_id, id, group_name,location, meeting_time, max_size,))
    
        return jsonify({'message': 'Study group successfully created'}), 201
    except ValueError:
        return jsonify({'error': 'Invalid input'}), 422
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@group_bp.route('/delete/<int:group_id>/<int:course_id>', methods = ["DELETE"])
@jwt_required()
def delete_group(group_id, course_id):
    id = get_jwt_identity()

    try:
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as cur:
                cur.execute("""
                            DELETE FROM studygroup
                            WHERE host_id = %s 
                                AND group_id = %s
                                AND course_id = %s
                            """, (id, group_id, course_id,))
                
                my_groups = cur.execute("""
                            SELECT *
                            FROM studygroup
                            WHERE host_id = %s
                            """,(id,)).fetchall()
                
                return jsonify({'message': 'Study Group removed successfully',
                                'my_groups': my_groups}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@group_bp.route('/leave/<int:group_id>', methods = ["DELETE"])
@jwt_required()
def leave_group(group_id):
    id = get_jwt_identity()

    try:
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as cur:
                cur.execute("""
                            DELETE FROM participating
                            WHERE student_id = %s 
                                AND group_id = %s
                            """, (id, group_id,))
                
                joined = cur.execute("""
                                     SELECT sg.group_id, sg.course_id, sg.group_name, sg.location, sg.meeting_time, sg.max_size, c.course_name, c.course_code
                                     FROM studygroup as sg
                                     JOIN participating as p ON p.group_id = sg.group_id
                                     JOIN course as c ON c.course_id = sg.course_id
                                     WHERE p.student_id = %s
                                     """, (id,)).fetchall()
                
                return jsonify({'message': 'Study Group left successfully',
                                'joined_groups': joined}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@group_bp.route('/me', methods = ["GET"])
@jwt_required()
def my_groups():
    id = get_jwt_identity()

    try:
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as cur:
                groups = cur.execute("""
                                    SELECT sg.group_id, sg.course_id, sg.group_name, sg.location, sg.meeting_time, sg.max_size, c.course_name, c.course_code
                                    FROM studygroup as sg
                                    JOIN course as c ON c.course_id = sg.course_id
                                    WHERE sg.host_id = %s
                                    """, (id,)).fetchall()
                
                joined = cur.execute("""
                                     SELECT sg.group_id, sg.course_id, sg.group_name, sg.location, sg.meeting_time, sg.max_size, c.course_name, c.course_code
                                     FROM studygroup as sg
                                     JOIN participating as p ON p.group_id = sg.group_id
                                     JOIN course as c ON c.course_id = sg.course_id
                                     WHERE p.student_id = %s
                                     """, (id,)).fetchall()
                
                return jsonify({'my_groups': groups,
                                'joined_groups': joined}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


#Advanced function route
@group_bp.route('/all/recommend', methods = ["GET"])
@jwt_required()
def all_groups():
    id = get_jwt_identity()

    with pool.connection() as conn:
        with conn.cursor(row_factory=dict_row) as cur:

            pass
