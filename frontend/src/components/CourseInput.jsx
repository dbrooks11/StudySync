import useState from "react";

export default function CourseInput(){
    const [course, setCourse] = useState("");
    
    const handleSubmit = () => {
        console.log("searching for:", course);
    }

    return (
        <div>
            <h2>Enter Course</h2>

            <input
                type="text"
                placeholder="e.g. COP3502"
                value={course}
                onChange={(e)=>setCourse(e.target.value)}
            />

            <button onClick={handleSubmit}>Search</button>
        </div>
    );
}