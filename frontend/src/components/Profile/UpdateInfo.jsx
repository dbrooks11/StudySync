
import { useState } from 'react'
import ErrorMessage from '../ErrorMessage'

export default function UpdateInfoForm({label, name, value, setProfile, openForm}){
    const [error, setError] = useState('')

    async function updateProfile(event) {
        event.preventDefault()
        setError('')
        const formData = new FormData(event.target)
        try{
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/edit`, {
            credentials: "include",
            method: "PATCH",
            body: formData
        })
        
        const data = await response.json()

        if(!response.ok){
            const message = data?.error || 'Unable to update profile. Please check GPA and Email inputs.'
            setError(message)
            throw new Error(message)
        }
        setProfile(prevProfile => {
            return (
                {
                    ...prevProfile,
                    info: {
                        ...prevProfile.info,
                        ...data.profile
                    }
                }
            )
        })
        console.log(data.profile)
        openForm(false)
        } catch(error){
            console.log(error)
            if (!error?.message) {
                setError('Unable to update profile. Please try again.')
            }
        }
    }

    return(
        <form onSubmit={updateProfile} className="update-form">
            <button type="button" className="close-btn" onClick={() => openForm(false)}>X</button>
            {error && <ErrorMessage message={error} />}
            <div className="update-container">
                <label htmlFor={label}>{label}</label>
                <input name={name} id={label} defaultValue={value}></input>
            </div>
            <button type="submit">Update {label}</button>
        </form>
    )
}