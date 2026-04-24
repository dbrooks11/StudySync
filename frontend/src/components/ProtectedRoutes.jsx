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
                    route: "/profile", 
                    icon: "fa-solid fa-user",
                    color: "#8efb29"
                },
                {
                    title: "Enrolled courses",
                    route: "/courses", 
                    icon: "fa-solid fa-book-open",
                    color: "#008b17"
                },
                {
                    title: "Join Group",
                    route: "/join-group", 
                    icon: "fa-solid fa-user-plus",
                    color: "#4c00ff"
                },
                {
                    title: "Create Group",
                    route: "/create-group", 
                    icon: "fa-solid fa-users",
                    color: "#ff00dd"
                },
                {
                    title: "Joined Groups",
                    route: "/joined",
                    icon: "fa-solid fa-layer-group",
                    color: "#c76e09"
                }
            ]} 
            />
            <main className="main">
                <Outlet/>
            </main>
        </div>
    )
}