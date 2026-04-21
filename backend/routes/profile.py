from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.db import pool

profile_bp = Blueprint('profile', __name__ , url_prefix='/profile')

@profile_bp.route('/availability', methods=['GET'])
@jwt_required()
def get_availability():
    student_id = get_jwt_identity()
    try:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT day_of_week, start_time, end_time
                    FROM Availability
                    WHERE student_id = %s
                    ORDER BY day_of_week, start_time
                """, (student_id,))
                availability = cur.fetchall()

        avail_list = []
        for slot in availability:
            avail_list.append({
                'day_of_week': slot[0],
                'start_time': slot[1].strftime('%H:%M') if slot[1] else None,
                'end_time': slot[2].strftime('%H:%M') if slot[2] else None
            })

        return jsonify(avail_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

