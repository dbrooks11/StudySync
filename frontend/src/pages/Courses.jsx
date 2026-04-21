import { useState } from "react";

export default function Courses(){
    const [form, setForm] = useState({
        course_code: "",
        course_name: "",
        department: "",
        credit_hours: ""
    });
    
    const handleChange = (field, value) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = () => {
        console.log("Submitting course:", form);
    };

    return (
        <div className="course-form">
            <h2>Add a course to your enrollment</h2>
                <div className="course-grid">
                    <input
                        placeholder="Course Code"
                        value = {form.course_code}
                        onChange={(e) => handleChange("course_code", e.target.value)}
                    />
                    <input
                        placeholder="Course Name"
                        value={form.course_name}
                        onChange={(e) => handleChange("course_name", e.target.value)}
                    />
                    <input
                        placeholder="Department"
                        value={form.department}
                        onChange={(e) => handleChange("department", e.target.value)}
                    />
                    <input
                        placeholder="Credit Hours"
                        type="number"
                        value={form.credit_hours}
                        onChange={(e) => handleChange("credit_hours", e.target.value)}
                    />
                </div>
            <button className="submit-btn" onClick={handleSubmit}>
                Add Course
            </button>
        </div>
    );
}