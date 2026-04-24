import {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import SuggestedGroups from "../components/Profile/SuggestedGroups";
import Availability from "../components/Profile/Availability";
import Info from "../components/Profile/Info";


export default function Profile(){
const [profile, setProfile] = useState({})

useEffect(() => {
    const fetchProfile = async() => {
        try{
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/me`, {
            credentials: "include",
            method: "GET"
        })
        
        const data = await response.json()

        if(!response.ok){
            throw new Error(data)
        }
        setProfile(data.profile)
        } catch(error){
            console.log(error)
        }
    }

    fetchProfile()
}, []);

    return(
        <main className="profile-layout">
            <div className="top-row">
                <div className="profile-card">
                    
                    <Info
                        firstName = {profile.info?.first_name}
                        lastName = {profile.info?.last_name}
                        email = {profile.info?.email}
                        major = {profile.info?.major}
                        gpa = {profile.info?.gpa}
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
                <SuggestedGroups />
            </div>
        </main>
    );
}