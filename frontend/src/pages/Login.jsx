import {useNavigate} from 'react-router-dom'



export default function Login() {
    const navigate = useNavigate()

    const loginForm = async(formData) => {
        try{
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`, {
                method: "POST",
                body: formData,
                credentials: "include"
            })

            const data = await response.json()

            if(response.ok) {
                console.log(data.message)
                navigate('/profile')
                
            }else{
                throw new Error(data.error)
            }
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className="auth-form-wrapper">
        <form action={loginForm}>
            <h2>Login</h2>
            <section className="auth-form-login" id="auth-form-login">
                <div className='auth-form-input'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" ></input>
                </div>
                <div className='auth-form-input'>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" ></input>
                </div>
            </section>
            <button type="submit" id="auth-form-button">Login</button>
        </form>
        </div>
    )
}