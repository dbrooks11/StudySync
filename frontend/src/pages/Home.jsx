import {useState} from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CourseInput from "../components/CourseInput";
import SuggestedGroups from "../components/SuggestedGroups";

export default function Home(){

const [leftOpen, setLeftOpen] = useState(false);
const [rightOpen, setRightOpen] = useState(false);

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
                <CourseInput />
                <SuggestedGroups />
            </main>
        </div>
    );
}