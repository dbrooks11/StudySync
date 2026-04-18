
import '../css/Auth.css'

export default function Register() {

    const registerForm = async(formData) => {
        console.log(formData)
       try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/register`, {
            method: "POST",
            body: formData,
        })

        const data = await response.json()

        if(response.ok){
            console.log(data.message)
        }else{
            throw new Error(data.error)
        }
       }catch(error){
        console.log(error)
       } 
    }


    return (
        <form action={registerForm}>
            <h2>Register</h2>
            <section className="auth-form" id="auth-form">
                <div className='auth-form-input'>
                    <label htmlFor="first_name">First Name</label>
                    <input id="first_name" name="first_name" placeholder='e.g. John' ></input>
                </div>
                <div className='auth-form-input'>
                    <label htmlFor="last_name">Last Name</label>
                    <input id="last_name" name="last_name" placeholder='e.g. Doe' ></input>
                </div>
                <div className='auth-form-input'>
                    <label htmlFor="major">Major</label>
                    <input id="major" name="major" placeholder='e.g. Computer Science' ></input>
                </div>
                <div className='auth-form-input'>
                    <label htmlFor="gpa">Gpa</label>
                    <input type="number" step='0.1' id="gpa" name="gpa" placeholder='e.g. 3.5' ></input>
                </div>
                <div className='auth-form-input'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" ></input>
                </div>
                <div className='auth-form-input'>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" ></input>
                </div>
            </section>
            <button type="submit" id="auth-form-button">Register</button>
        </form>
    )
}