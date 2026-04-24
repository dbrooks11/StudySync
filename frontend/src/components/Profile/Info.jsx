import UpdateInfoForm from "./UpdateInfo"
import { useState } from "react"

export default function Info({firstName, lastName, email, major, gpa, setProfile}){

    const [openForm, setOpenForm] = useState(false)
    const [info, setInfo] = useState({
        label: "",
        name: "",
        value: ""
    })

    return(
        <section id='info-container'>
            <div id="info-name">
                <span>{firstName} {lastName}</span>
            </div>
            <div id="info-fields">
                <div className="info-row">
                    <div className="info-edit-container">
                        <span className="info-label">Email</span>
                        <button type="button" className="info-button" onClick={() => {
                            setOpenForm(true)
                            setInfo({
                                label: 'Email',
                                name: 'email',
                                value: email
                            })
                        }}>+</button>
                    </div>
                    <span className="info-value">{email}</span>
                </div>
                <div className="info-row">
                    <div className="info-edit-container">
                        <span className="info-label">Major</span>
                        <button type="button" className="info-button" onClick={() => {
                            setOpenForm(true)
                            setInfo({
                                label: 'Major',
                                name: 'major',
                                value: major
                            })
                        }}>+</button>
                    </div>
                    <span className="info-value">{major}</span>
                </div>
                <div className="info-row">
                    <div className="info-edit-container">
                        <span className="info-label">GPA</span>
                        <button type="button" className="info-button" onClick={() => {
                            setOpenForm(true)
                            setInfo({
                                label: 'GPA',
                                name: 'gpa',
                                value: gpa
                            })
                        }}>+</button>
                    </div>
                    <span className="info-value">{gpa}</span>
                </div>
            </div>
            {openForm && 
            <UpdateInfoForm
                label={info.label}
                name={info.name}
                value={info.value}
                setProfile={setProfile}
                openForm={setOpenForm}
            />}
        </section>
    )
}
