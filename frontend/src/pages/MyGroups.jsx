import { useEffect, useState } from "react";


export default function MyGroups(){

    const [createdGroups, setCreatedGroups] = useState([])
    const [joinedGroups, setJoinedGroups ] = useState([])

    useEffect(() => {
        const fetchMyGroups = async() => {
            try {
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/groups/me`, {
                    credentials: "include",
                })

                const data = await response.json()

                if(!response.ok){
                    throw new Error(data.error)
                }

                setCreatedGroups(data.my_groups)
                setJoinedGroups(data.joined_groups)

                console.log(data)
            }catch(error){
                console.error(error)
            }
        }
        
        fetchMyGroups()
        
    }, []);

    async function deleteGroup(groupId, courseId) {
        try{
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/groups/delete/${groupId}/${courseId}`, {
                credentials: "include",
                method: "DELETE"
            })

            const data = await response.json()

            if(!response.ok){
                    throw new Error(data.error)
            }

            setCreatedGroups(data.my_groups)

            console.log(data)
        }catch(error){
            console.error(error)
        }
    }

    async function leaveGroup(groupId) {
        try{
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/groups/leave/${groupId}`, {
                credentials: "include",
                method: "DELETE"
            })

            const data = await response.json()

            if(!response.ok){
                    throw new Error(data.error)
            }

            setJoinedGroups(data.joined_groups)

            console.log(data)
        }catch(error){
            console.error(error)
        }
    }

    return(
        <section className="group-container">
            <div>
                <h3>Your Created Groups</h3>
                {createdGroups.map((group) => {
                    return(
                        <div className="group" key={group.group_id}>
                            <div>
                                <div className="group top">
                                    <span>{group.group_name}</span>
                                    <span>{group.course_code}</span>
                                    <span>{group.course_name}</span>
                                </div>
                                <div className="group bottom">
                                    <span>on {group.meeting_time}</span>
                                    <span>at {group.location}</span>
                                </div>
                                <span>Joined 0/{group.max_size}</span>
                            </div>
                            <button type="button" onClick={() => deleteGroup(group.group_id, group.course_id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
            <div>
                <h3>Your Joined Groups</h3>
                {joinedGroups.map((group) => {
                    return(
                        <div className="group" key={group.group_id}>
                            <div>
                                <div className="group top">
                                    <span>{group.group_name}</span>
                                    <span>{group.course_code}</span>
                                    <span>{group.course_name}</span>
                                </div>
                                <div className="group bottom">
                                    <span>on {group.meeting_time}</span>
                                    <span>at {group.location}</span>
                                </div>
                                <span>Joined 0/{group.max_size}</span>
                            </div>
                            <button type="button" onClick={() => leaveGroup(group.group_id)}>Leave</button>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}