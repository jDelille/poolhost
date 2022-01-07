import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./Signup.css";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <div className="page">
      <div className="card">
        <div className="card-content">
          <h2> Password Reset </h2>
          {/* Error  */}
          {error && alert(error)}
          <form className="form" onSubmit={handleSubmit}>
            {/* Email  */}
            <label>Email</label>
            <input type="email" ref={emailRef} required />
            {/* reset password btn  */}
            <button className="form-btn" type="submit" disabled={loading}>
              {" "}
              Reset Password{" "}
            </button>
          </form>
          <div className="bck-to-login">
            <Link to="/login">
              {" "}
              <p className="login-link">Login</p>{" "}
            </Link>
          </div>
        </div>
        <div className="switch-to-login-btn">
          Need an account?{" "}
          <Link to="/signup">
            <p className="login-link">Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
