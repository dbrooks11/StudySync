export default function SuggestedGroups({ groups = []}) {

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