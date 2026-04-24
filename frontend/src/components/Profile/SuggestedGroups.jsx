export default function SuggestedGroups({ groups = [
        { group_id: 1, group_name: "Study Group A", course_id: "COP3330", host_id: "John Doe", location: "Dirac Library", meeting_time: "Mon 3:00 PM" },
        { group_id: 2, group_name: "Study Group B", course_id: "MAC2311", host_id: "Jane Smith", location: "Strozier Library", meeting_time: "Wed 5:00 PM" },
        { group_id: 3, group_name: "Study Group C", course_id: "CDA3101", host_id: "Bob Jones", location: "Online", meeting_time: "Fri 1:00 PM" },
    ]}) {

    return (
        <div className="suggestions">
            <h3>Suggested Groups</h3>
            <div className="group-container">
                {groups.map((group) => (
                    <div key={group.group_id} className="group-card">
                        <div className="group-name">{group.group_name}</div>
                        <div className="group-row">
                            <span className="group-label">Course</span>
                            <span>{group.course_id}</span>
                        </div>
                        <div className="group-row">
                            <span className="group-label">Host</span>
                            <span>{group.host_id}</span>
                        </div>
                        <div className="group-row">
                            <span className="group-label">Location</span>
                            <span>{group.location}</span>
                        </div>
                        <div className="group-row">
                            <span className="group-label">Meets</span>
                            <span>{group.meeting_time}</span>
                        </div>
                        <button className="group-join-btn">Join</button>
                    </div>
                ))}
            </div>
        </div>
    );
}