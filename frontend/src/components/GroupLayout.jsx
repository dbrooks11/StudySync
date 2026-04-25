export default function GroupLayout(props){
    return(
        <div>
            <div className="group-name">{props.group_name}</div>
            <div className="group-row">
                <span className="group-label">Course</span>
                <span>{props.course_code}{props.course_name ? ` — ${props.course_name}` : ''}</span>
            </div>
            <div className="group-row">
                <span className="group-label">Location</span>
                <span>{props.location ?? 'TBD'}</span>
            </div>
            <div className="group-row">
                <span className="group-label">Meets</span>
                <span>{props.meeting_time ?? 'TBD'}</span>
            </div>
            <div className="group-row">
                <span className="group-label">Spots Left</span>
                <span>{props.spots_left ?? props.max_size} / {props.max_size}</span>
            </div>
        </div>
    )
}