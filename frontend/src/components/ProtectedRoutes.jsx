import Navbar from "./Navbar"
import { useState } from "react";
import { Outlet } from "react-router-dom";


export default function ProtectedRoutes() {

    const [leftOpen, setLeftOpen] = useState(false);


    return (
        <div className="app">
            <Navbar
            options = {[
                {
                    title: "Profile",
                    route: "/profile"
                },
                {
                    title: "Enrolled courses",
                    route: "/courses"
                },
                {
                    title: "Join Group",
                    route: "/join-group"
                },
                {
                    title: "Create Group",
                    route: "/create-group"
                },
                {
                    title: "Joined Groups",
                    route: "/joined"
                }
            ]} 
            />
            <main className="main">
                <Outlet/>
            </main>
        </div>
    )
}