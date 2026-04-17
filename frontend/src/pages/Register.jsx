import { useState } from "react"

export default function Register() {



    return (
        <form>
            <div>
                <label htmlFor="first_name">First Name</label>
                <input id="first_name" name="first_name"></input>
            </div>
            <div>
                <label htmlFor="last_name">Last Name</label>
                <input id="last_name" name="last_name"></input>
            </div>
            <div>
                <label htmlFor="major">Major</label>
                <input id="major" name="major"></input>
            </div>
            <div>
                <label htmlFor="gpa">Gpa</label>
                <input type="number" id="gpa" name="gpa"></input>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"></input>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password"></input>
            </div>
        </form>
    )
}