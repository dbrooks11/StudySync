import Navbar from "./Navbar"
import { useState, useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom"

export default function ProtectedRoutes() {
    const [authed, setAuthed] = useState(null)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/me`, {
            credentials: "include"
        }).then(res => setAuthed(res.ok))
        .catch(() => setAuthed(false))
    }, [])

    if (authed === null) return null
    if (!authed) return <Navigate to="/login" replace />

    return (
        <div className="app">
            <Navbar options={[
                { title: "Profile", route: "/profile", icon: "fa-solid fa-user", color: "#8efb29" },
                { title: "Enrolled courses", route: "/courses", icon: "fa-solid fa-book-open", color: "#008b17" },
                { title: "Join Group", route: "/join-group", icon: "fa-solid fa-user-plus", color: "#4c00ff" },
                { title: "Create Group", route: "/create-group", icon: "fa-solid fa-users", color: "#ff00dd" }
            ]} />
            <main className="main">
                <Outlet/>
            </main>
        </div>
    )
}