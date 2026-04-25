import {useState, useEffect} from "react";
import Availability from "../components/Profile/Availability";
import Info from "../components/Profile/Info";
import GroupLayout from "../components/GroupLayout";

export default function Profile(){
    const [profile, setProfile] = useState({})
    const [joinedGroups, setJoinedGroups] = useState([])

    useEffect(() => {
        const fetchProfile = async() => {
            try{
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/me`, {
                    credentials: "include",
                    method: "GET"
                })
                const data = await response.json()
                if(!response.ok) throw new Error(data)
                setProfile(data.profile)
            }catch(error){
                console.log(error)
            }
        }

        const fetchJoinedGroups = async() => {
            try{
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/groups/me`, {
                    credentials: "include"
                })
                const data = await response.json()
                if(!response.ok) throw new Error(data.error)
                setJoinedGroups(data.joined_groups)
            }catch(error){
                console.log(error)
            }
        }

        fetchProfile()
        fetchJoinedGroups()
    }, []);

    const leaveGroup = async(groupId) => {
        try{
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/groups/leave/${groupId}`, {
                credentials: "include",
                method: "DELETE"
            })
            const data = await response.json()
            if(!response.ok) throw new Error(data.error)
            setJoinedGroups(data.joined_groups)
        }catch(error){
            console.log(error)
        }
    }

    return(
        <main className="profile-layout">
            <div className="top-row">
                <div className="profile-card">
                    <Info
                        firstName={profile.info?.first_name}
                        lastName={profile.info?.last_name}
                        email={profile.info?.email}
                        major={profile.info?.major}
                        gpa={profile.info?.gpa}
                        setProfile={setProfile}
                    />
                </div>
                <div className="avail-card">
                    <Availability
                        availabilities={profile?.availability}
                        setProfile={setProfile}
                    />
                </div>
            </div>
            <div className="groups-card">
                <h3>Your Joined Groups</h3>
                <div className="course-cards-container">
                    {joinedGroups.map((group) => (
                        <div key={group.group_id} className="group-card">
                            <GroupLayout {...group} />
                            <button className="remove-btn" type="button" onClick={() => leaveGroup(group.group_id)}>
                                Leave
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}