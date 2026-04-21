from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.db import pool

groups_bp = Blueprint('groups', __name__, url_prefix='/groups')

@groups_bp.route('', methods=['GET'])
@jwt_required()
def get_groups():
    try:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                # Get all study groups with course info and host name
                cur.execute("""
                    SELECT
                        sg.group_id,
                        sg.group_name,
                        sg.location,
                        sg.meeting_time,
                        sg.max_size,
                        c.course_code,
                        c.course_name,
                        s.first_name || ' ' || s.last_name AS host_name,
                        COUNT(p.student_id) AS current_size
                    FROM StudyGroup sg
                    JOIN Course c ON sg.course_id = c.course_id
                    JOIN Student s ON sg.host_id = s.student_id
                    LEFT JOIN Participating p ON sg.group_id = p.group_id
                    GROUP BY
                        sg.group_id,
                        sg.group_name,
                        sg.location,
                        sg.meeting_time,
                        sg.max_size,
                        c.course_code,
                        c.course_name,
                        s.first_name,
                        s.last_name
                """)
                groups = cur.fetchall()


        groups_list = []
        for group in groups:
            groups_list.append({
                'group_id': group[0],
                'group_name': group[1],
                'location': group[2],
                'meeting_time': group[3].isoformat() if group[3] else None,
                'max_size': group[4],
                'course_code': group[5],
                'course_name': group[6],
                'host_name': group[7],
                'current_size': group[8]
            })

        return jsonify(groups_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@groups_bp.route('/<int:group_id>/join', methods=['POST'])
@jwt_required()
def join_group(group_id):
    student_id = get_jwt_identity()
    try:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                # Check if group exists and not full
                cur.execute("""
                    SELECT max_size, COUNT(p.student_id) as current_size
                    FROM StudyGroup sg
                    LEFT JOIN Participating p ON sg.group_id = p.group_id
                    WHERE sg.group_id = %s
                    GROUP BY sg.max_size
                """, (group_id,))
                group_info = cur.fetchone()

                if not group_info:
                    # Unrelated, but I've always wanted to make a 404
                    return jsonify({'error': 'Group not found'}), 404

                max_size, current_size = group_info
                if current_size >= max_size:
                    return jsonify({'error': 'Group is full'}), 400

                cur.execute("""
                            SELECT 1 
                            FROM Participating 
                            WHERE student_id = %s 
                            AND group_id = %s
                            """, (student_id, group_id))
                if cur.fetchone():
                    return jsonify({'error': 'Already in this group'}), 400

                # Add to participating
                cur.execute("INSERT INTO Participating (student_id, group_id) VALUES (%s, %s)",
                           (student_id, group_id))
                conn.commit()

        return jsonify({'message': 'Successfully joined group'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500