import { useEffect, useState } from "react";



export default function Courses(){


    
    const [courseList, setCourseList] = useState([
        { course_id: 1, course_code: "COP3330", course_name: "Object Oriented Programming", department: "Computer Science", credits: 3 },
        { course_id: 2, course_code: "MAC2311", course_name: "Calculus I", department: "Mathematics", credits: 4 },
        { course_id: 3, course_code: "CDA3101", course_name: "Computer Organization", department: "Computer Science", credits: 3 },
        { course_id: 1, course_code: "COP3330", course_name: "Object Oriented Programming", department: "Computer Science", credits: 3 },
        { course_id: 2, course_code: "MAC2311", course_name: "Calculus I", department: "Mathematics", credits: 4 },
        { course_id: 1, course_code: "COP3330", course_name: "Object Oriented Programming", department: "Computer Science", credits: 3 },
        { course_id: 2, course_code: "MAC2311", course_name: "Calculus I", department: "Mathematics", credits: 4 }
    ])
    const [enrolledCourses, setEnrolledCourses] = useState([
        { course_id: 4, course_code: "COP4600", course_name: "Operating Systems", department: "Computer Science", credits: 3 },
        { course_id: 5, course_code: "MAD2104", course_name: "Discrete Mathematics", department: "Mathematics", credits: 3 },
        { course_id: 1, course_code: "COP3330", course_name: "Object Oriented Programming", department: "Computer Science", credits: 3 },
        { course_id: 2, course_code: "MAC2311", course_name: "Calculus I", department: "Mathematics", credits: 4 },
        { course_id: 1, course_code: "COP3330", course_name: "Object Oriented Programming", department: "Computer Science", credits: 3 },
    ])

    useEffect(() => {
        const getCourses = async() => {
            try {
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/courses/all`, {
                credentials: "include",
                method: "GET"
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data)
            }

            setCourseList(data.course_list)
            setEnrolledCourses(data.enrolled_courses)

            }catch(error){
                console.error(error)
            }
        }

        getCourses()
    }, []);

    const handleCourseListSubmit = async(formData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/courses/course-list/add`, {
                credentials: "include",
                method: "POST",
                body: formData
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error)
            }

            setCourseList(data.course_list)

        }catch(error){
            console.error(error)
        }
    };

    const enrollCourse = async(courseId, courseCode) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/courses/enroll`, {
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify({
                    course_id: courseId,
                    course_code: courseCode
                })
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error)
            }

            setEnrolledCourses(data.enrolled_courses)
        }catch(error){
            console.error(error)
        }
    }

    const deleteEnrolledCourse = async(courseId, courseCode) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/courses/enroll/delete/${courseId}/${courseCode}`, {
                credentials: "include",
                method: "DELETE"
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error)
            }

            setEnrolledCourses(data.enrolled_courses)
        }catch(error){
            console.error(error)
        }
    }

    return (
    <main className="courses-layout">
        <div className="courses-form-card">
            <h2>Add a Course</h2>
            <p className="courses-subtitle">Don't see your course? Add it to the list then enroll!</p>
            <form className="course-form" action={handleCourseListSubmit}>
                <div className="course-grid">
                    <input placeholder="Course Code (ex. COP3330)" name="course_code" />
                    <input placeholder="Course Name" name="course_name" />
                    <input placeholder="Department" name="department" />
                    <input placeholder="Credit Hours" name="credit_hours" type="number" />
                </div>
                <button type="submit" className="submit-btn">Add Course</button>
            </form>
        </div>

        <div className="courses-lists">
            <div className="courses-list-card">
                <h3>Enrolled Courses</h3>
                <div className="course-cards-container">
                    {enrolledCourses.map((course) => (
                        <div className="course-card" key={course.course_id}>
                            <div className="course-card-top">
                                <span className="course-code">{course.course_code}</span>
                                <span className="course-name">{course.course_name ?? 'N/A'}</span>
                            </div>
                            <div className="course-card-bottom">
                                <div className="course-detail">
                                    <span className="course-label">Department</span>
                                    <span>{course.department ?? 'N/A'}</span>
                                </div>
                                <div className="course-detail">
                                    <span className="course-label">Credits</span>
                                    <span>{course.credits ?? 'N/A'}</span>
                                </div>
                            </div>
                            <button className="remove-btn" type="button" onClick={() => deleteEnrolledCourse(course.course_id, course.course_code)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="courses-list-card">
                <h3>Course List</h3>
                <div className="course-cards-container">
                    {courseList.map((course) => (
                        <div className="course-card" key={course.course_id}>
                            <div className="course-card-top">
                                <span className="course-code">{course.course_code}</span>
                                <span className="course-name">{course.course_name ?? 'N/A'}</span>
                            </div>
                            <div className="course-card-bottom">
                                <div className="course-detail">
                                    <span className="course-label">Department</span>
                                    <span>{course.department ?? 'N/A'}</span>
                                </div>
                                <div className="course-detail">
                                    <span className="course-label">Credits</span>
                                    <span>{course.credits ?? 'N/A'}</span>
                                </div>
                            </div>
                            <button className="enroll-btn" type="button" onClick={() => enrollCourse(course.course_id, course.course_code)}>
                                Enroll
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </main>
    );

    /*return (
        <main>
            <form className="course-form" action={handleCourseListSubmit}>
                <h2>Don't see your course? Add it to the list then enroll!</h2>
                    <div className="course-grid">
                        <input
                            placeholder="Course Code (ex. COP3330)"
                            name="course_code"
                        />
                        <input
                            placeholder="Course Name"
                            name="course_name"
                        />
                        <input
                            placeholder="Department"
                            name="department"
                        />
                        <input
                            placeholder="Credit Hours"
                            name="credit_hours"
                            type="number"
                        />
                    </div>
                <button type="submit" className="submit-btn">
                    Add Course
                </button>
            </form>

            <section className="courses-container">
                <div>
                    <h3>Course List</h3>
                    {courseList.map((course) => {
                        return(
                            <div className="course" key={course.course_id}>
                                <div>
                                    <div className="course top">
                                        <span>{course.course_code}</span>
                                        <span>{course.course_name ? course.course_name : 'N/A'}</span>
                                    </div>
                                    <div className="course bottom">
                                        <span>Department: {course.department ? course.department : 'N/A'}</span>
                                        <span>credits: {course.credits ? course.credits : 'N/A'}</span>
                                    </div>
                                </div>
                                <button type="button" onClick={() => enrollCourse(course.course_id, course.course_code)}>Enroll</button>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h3>Enrolled Courses</h3>
                    {enrolledCourses.map((course) => {
                        return(
                            <div className="course" key={course.course_id}>
                                <div>
                                    <div className="course top">
                                        <span>{course.course_code}</span>
                                        {course.course_name && <span> - {course.course_name}</span>}
                                    </div>
                                    <div className="course bottom">
                                        <span>Department: {course.department ? course.department : 'N/A'}</span>
                                        <span>credits: {course.credits ? course.credits : 'N/A'}</span>
                                    </div>
                                </div>
                                <button type="button" onClick={() => deleteEnrolledCourse(course.course_id, course.course_code)}>Remove</button>
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>   
    );*/
}