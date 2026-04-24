


export default function UpdateInfoForm({label, name, value, setProfile, openForm}){

    async function updateProfile(formData) {
        try{
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/edit`, {
            credentials: "include",
            method: "PATCH",
            body: formData
        })
        
        const data = await response.json()

        if(!response.ok){
            throw new Error(data.error)
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
        }
    }

    return(
        <form action={updateProfile} className="update-form">
            <button type="button" className="close-btn" onClick={() => openForm(false)}>X</button>
            <div className="update-container">
                <label htmlFor={label}>{label}</label>
                <input name={name} id={label} defaultValue={value}></input>
            </div>
            <button type="submit">Update {label}</button>
        </form>
    )
}