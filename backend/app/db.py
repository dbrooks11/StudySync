import os

import psycopg_pool

pool = psycopg_pool.ConnectionPool(
    conninfo=os.environ.get("DATABASE_URL"),
    min_size=1,
    max_size=20,
    open=False
)

def init_pool():
    pool.open(wait=True)

def init_db():
    with pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS Student (
                    student_id SERIAL PRIMARY KEY,
                    first_name TEXT NOT NULL,
                    last_name TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    password_hash TEXT NOT NULL,
                    major TEXT,
                    gpa REAL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)
            cur.execute("""
                CREATE TABLE IF NOT EXISTS Course (
                    course_id SERIAL PRIMARY KEY,
                    course_code TEXT UNIQUE NOT NULL,
                    course_name TEXT NOT NULL,
                    department TEXT,
                    credits INTEGER
                );
            """)
            cur.execute("""
                CREATE TABLE IF NOT EXISTS Availability (
                    avail_id SERIAL PRIMARY KEY,
                    student_id INTEGER REFERENCES Student(student_id) ON DELETE CASCADE,
                    day_of_week TEXT NOT NULL,
                    start_time TIME NOT NULL,
                    end_time TIME NOT NULL
                );
            """)
            cur.execute("""
                CREATE TABLE IF NOT EXISTS Enrollment (
                    student_id INTEGER REFERENCES Student(student_id) ON DELETE CASCADE,
                    course_id INTEGER REFERENCES Course(course_id) ON DELETE CASCADE,
                    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (student_id, course_id)
                );
            """)
            cur.execute("""
                CREATE TABLE IF NOT EXISTS StudyGroup (
                    group_id SERIAL PRIMARY KEY,
                    course_id INTEGER REFERENCES Course(course_id) ON DELETE CASCADE,
                    host_id INTEGER REFERENCES Student(student_id) ON DELETE CASCADE,
                    group_name TEXT NOT NULL,
                    location TEXT,
                    meeting_time TIMESTAMP,
                    max_size INTEGER,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)
            cur.execute("""
                CREATE TABLE IF NOT EXISTS Participating (
                    student_id INTEGER REFERENCES Student(student_id) ON DELETE CASCADE,
                    group_id INTEGER REFERENCES StudyGroup(group_id) ON DELETE CASCADE,
                    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (student_id, group_id)
                );
            """)
            conn.commit()