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
        <div className="auth-page">
            <img src="src/assets/StudySyncLogo1.png" alt="StudySync Logo" className="auth-logo" />
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Sign in to your StudySync account</p>
                <form className="auth-form-fields" action={loginForm}>
                    <div className="auth-field">
                        <label className="auth-label" htmlFor="email">Email</label>
                        <input className="auth-input" type="email" id="email" name="email" placeholder="you@university.edu" />
                    </div>
                    <div className="auth-field">
                        <label className="auth-label" htmlFor="password">Password</label>
                        <input className="auth-input" type="password" id="password" name="password" placeholder="••••••••" />
                    </div>
                    <button type="submit" className="auth-submit-btn">Login</button>
                </form>
                <p className="auth-switch">Don't have an account? <a href="/register">Register here</a></p>
            </div>
        </div>
    )
}