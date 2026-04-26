import { useState, useEffect, Fragment } from "react";
import GroupLayout from "../components/GroupLayout";
import SuggestedGroups from "../components/Profile/SuggestedGroups";

export default function JoinGroup() {
    const [recommendedGroups, setRecommendedGroups] = useState([])
    const [allGroups, setAllGroups] = useState([])

    const fetchAllGroups = async() => {
        try{
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/groups/all`, {
                credentials: "include",
            })
            const data = await response.json()
            if(!response.ok) throw new Error(data.error)
            setAllGroups(data.all_groups)
        }catch(error){
            console.error(error)
        }
    }

    const fetchRecommendedGroups = async() => {
        try{
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/groups/all/recommend`, {
                credentials: "include",
            })
            const data = await response.json()
            if(!response.ok) throw new Error(data.error)
            setRecommendedGroups(data.recommended_groups)
        }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        fetchRecommendedGroups()
        fetchAllGroups()
    }, []);

    async function joinGroup(groupId) {
        try{
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/groups/join/${groupId}`, {
                credentials: "include",
                method: "POST"
            })
            const data = await response.json()
            if(!response.ok) throw new Error(data.error)
            fetchRecommendedGroups()
            fetchAllGroups()
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
            if(!response.ok) throw new Error(data.error)
            fetchRecommendedGroups()
            fetchAllGroups()
        }catch(error){
            console.error(error)
        }
    }

    return(
        <main className="courses-layout">
            <div className="groups-card">
                <SuggestedGroups 
                    groups={recommendedGroups}
                    onJoin={joinGroup}
                    onLeave={leaveGroup}
                />
            </div>

            <div className="courses-list-card">
                <h3>All Groups</h3>
                <div className="course-cards-container">
                    {allGroups.map(group => (
                        <div key={group.group_id} className="group-card">
                            <GroupLayout {...group} />
                            {!group.is_joined
                                ? <button className="enroll-btn" onClick={() => joinGroup(group.group_id)}>Join</button>
                                : <button className="remove-btn" onClick={() => leaveGroup(group.group_id)}>Leave</button>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

/*import { useState, useEffect, Fragment } from "react";
import GroupLayout from "../components/GroupLayout";



export default function JoinGroup() {

    const [recommendedGroups, setRecommendedGroups] = useState([])

    const fetchRecommendedGroups = async() => {
        try{
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/groups/all/recommend`, {
                    credentials: "include",
                })

        const data = await response.json()

            if(!response.ok) {
                throw new Error(data.error)   
            }   

            setRecommendedGroups(data.recommended_groups)
            console.log(data)
        }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {     
        fetchRecommendedGroups()
    }, []);

    async function joinGroup(groupId) {
        try{
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/groups/join/${groupId}`, {
                credentials: "include",
                method: "POST"
                }
            )

            const data = await response.json()

            if(!response.ok) {
                throw new Error(data.error)   
            }   

            fetchRecommendedGroups()
            console.log(data.message)
        }catch(error){
            console.error(error)
        }
    }

    async function leaveGroup(groupId) {
        try{
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/groups/leave/${groupId}`, {
                credentials: "include",
                method: "DELETE"
                }
            )

            const data = await response.json()

            if(!response.ok) {
                throw new Error(data.error)   
            }   
            
            fetchRecommendedGroups()
            console.log(data.message)
        }catch(error){
            console.error(error)
        }
    }

    return(
        <>
        <h2>Recommended Groups</h2>
        {recommendedGroups.map(group => {
            return(
                <Fragment key={group.group_id}>
                    <GroupLayout
                        {...group}
                    />
                    {!group.is_joined ? <button onClick={() => joinGroup(group.group_id)}>Join</button> 
                    : <button onClick={() => leaveGroup(group.group_id)}>Leave</button>}
                </Fragment> 
            )
        })}
        </>
    )
}*/