import {useState, useEffect} from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CourseInput from "../Components/Profile/CourseInput";
import SuggestedGroups from "../components/Profile/SuggestedGroups";
import Availability from "../components/Profile/Availability";
import Info from "../components/Profile/Info";

import "../css/Profile.css";

export default function Profile(){

const [leftOpen, setLeftOpen] = useState(false);
const [rightOpen, setRightOpen] = useState(false);
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
        console.log(data.profile)
        setProfile(data.profile)
    } catch(error){
        console.log(error)
    }
    }

    fetchProfile()
}, []);

    return(
        <div className="app">
            <Header
                onLeftToggle={() => setLeftOpen(!leftOpen)}
                onRightToggle={() => setRightOpen(!rightOpen)}
            />

            <Sidebar 
            side="left" 
            open={leftOpen} 
            options={["Join Group",
                    "Create Group",
                    "Joined Groups"]}
            />
            <Sidebar 
            side="right" 
            open={rightOpen} 
            options={["Enrolled courses",
                    "Availability",
                    "Profile"]}
            />

            <main className="main">
                {/* <CourseInput /> */}
                <h1>Profile</h1>
                <Info
                    firstName = {profile.info?.first_name}
                    lastName = {profile.info?.last_name}
                    email = {profile.info?.email}
                    major = {profile.info?.major}
                    gpa = {profile.info?.gpa}
                />
                <Availability
                    availabilities={profile?.availability}
                    setProfile={setProfile}
                />
                <SuggestedGroups />
            </main>
        </div>
    );
}