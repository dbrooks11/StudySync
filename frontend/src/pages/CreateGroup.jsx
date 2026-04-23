import { formatTime } from "../util/datetimeConversion"
import { useState, useEffect } from "react"



export default function CreateGroup() {

    const [courseList, setCourseList] = useState([])

    async function createGroup(formData) {
        try{
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/groups/create`, {
                credentials: "include",
                method: "POST",
                body: formData
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error)
            }

            console.log(data.message)

        }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        async function getCourseList() {
            try{
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/courses/course-list`, {
                    credentials: "include",
                    method: "GET"
                })

                const data = await response.json()

                if(!response.ok){
                    throw new Error(data.error)
                }

                setCourseList(data.course_list)
                console.log(data.course_list)

            }catch(error){
                console.error(error)
            }
        }
        
        getCourseList()
    }, []);
        

    return(
        <section className='avail-container'>
            <form className="course-form" action={createGroup}>
                <h2>Create a Study Group</h2>
                    <div className="course-grid">
                        <div>
                            <label htmlFor="group-name">Group Name</label>
                            <input
                                placeholder="Group Name"
                                name="group_name"
                                id="group-name"
                            />
                        </div>
                        <div>
                            <label htmlFor="location">Location</label>
                            <input
                                placeholder="Location"
                                name="location"
                                id="location"
                            />
                        </div>
                        <div>
                            <label htmlFor="group-sze">Group Size</label>
                            <input
                                placeholder="Group size"
                                id="group-size"
                                name="max_size"
                                type="number"
                            />
                        </div>
                        <div>
                            <label htmlFor="meeting">Meeting Time</label>
                            <input
                                type="datetime-local"
                                id="meeting"
                                placeholder="Meeting Time"
                                name="meeting_time"
                            />
                        </div>
                        <div>
                            <label htmlFor="courses">Course</label>
                            <select name="course_id" id="courses">
                                {courseList.map(course => {
                                    return(
                                        <option key={course.course_id} value={course.course_id}>{course.course_code}</option>
                                    )
                                })}
                            </select>
                        </div>
                        
                    </div>
                <button type="submit" className="submit-btn">
                    Create Group
                </button>
            </form>
        </section>
    )
}