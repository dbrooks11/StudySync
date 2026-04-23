import Sidebar from "./Sidebar"
import Header from "./Header"
import { useState } from "react";
import { Outlet } from "react-router-dom";


export default function ProtectedRoutes() {

    const [leftOpen, setLeftOpen] = useState(false);
    const [rightOpen, setRightOpen] = useState(false);

    return (
        <div className="app">
            <Header
                onLeftToggle={() => setLeftOpen(!leftOpen)}
                onRightToggle={() => setRightOpen(!rightOpen)}
            />

            <Sidebar 
            side="left" 
            open={leftOpen}
            options = {[
                {
                    title: "Join Group",
                    route: "/join-group"
                },
                {
                    title: "Create Group",
                    route: "/create-group"
                }
            ]} 
            />
            <Sidebar 
            side="right" 
            open={rightOpen} 
            options = {[
                {
                    title: "Enrolled courses",
                    route: "/courses"
                },
                {
                    title: "Profile",
                    route: "/profile"
                },
                {
                    title: "My Groups",
                    route: "/my-groups"
                }
            ]}
            />
            <main className="main">
                <Outlet/>
            </main>
        </div>
    )
}