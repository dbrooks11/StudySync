export default function SuggestedGroups({ groups = [], onJoin, onLeave }) {
    return (
        <div className="suggestions">
            <h3>Recommended Groups</h3>
            <div className="group-container">
                {groups.map((group) => (
                    <div key={group.group_id} className="group-card">
                        <div className="group-name">{group.group_name}</div>
                        <div className="group-row">
                            <span className="group-label">Course</span>
                            <span>{group.course_code}{group.course_name ? ` — ${group.course_name}` : ''}</span>
                        </div>
                        <div className="group-row">
                            <span className="group-label">Location</span>
                            <span>{group.location ?? 'TBD'}</span>
                        </div>
                        <div className="group-row">
                            <span className="group-label">Meets</span>
                            <span>{group.meeting_time ?? 'TBD'}</span>
                        </div>
                        <div className="group-row">
                            <span className="group-label">Spots Left</span>
                            <span>{group.spots_left} / {group.max_size}</span>
                        </div>
                        {!group.is_joined
                            ? <button className="group-join-btn" onClick={() => onJoin(group.group_id)}>Join</button>
                            : <button className="remove-btn" onClick={() => onLeave(group.group_id)}>Leave</button>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}