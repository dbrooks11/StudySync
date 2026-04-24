

export default function GroupLayout(props){
    return(
        <div>
            <div className="group top">
                <span>{props.group_name}</span>
                <span>{props.course_code}</span>
                <span>{props.course_name}</span>
            </div>
            <div className="group bottom">
                <span>on {props.meeting_time}</span>
                <span>at {props.location}</span>
            </div>
            <span>Joined {props.spots_left}/{props.max_size}</span>
        </div>
    )
}