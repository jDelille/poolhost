import React, {useRef, useState} from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import './Signup.css'

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to log in")
        }
        setLoading(false)
    }


    return (
        <div className="page">
        <div className="card">
            <div className="card-content">
            <h2 className="login-title"> Sign in to your account </h2>
            {/* Error  */}
            <form className="form" onSubmit={handleSubmit}>
                {/* Email  */}
                <label>Email</label>
                <input type="email" ref={emailRef} required />
                {/* Password */}
                <label>Password</label>
                <input type="password" ref={passwordRef} required />
                {/* Login btn  */}
                <button className="form-btn" type="submit" disabled={loading}> Log In </button>
            </form>
                <div className="forgot-password">
                    <Link to="/forgot-password"> <p className="login-link">Forgot Password?</p> </Link>
                </div>
                <div className="switch-to-login-btn">
                Need an account? <Link to='/signup'><p className="login-link">Sign Up</p></Link>
            </div>
            </div>
            
            
        </div>
        </div>
    )
}


