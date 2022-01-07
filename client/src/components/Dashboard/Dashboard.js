import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "../Firebase/Signup.css";
import "./Dashboard.css";
import Anime, { anime } from "react-anime";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  const Anime = () => {
    anime({
      targets: ".down-arrow",
      translateY: [10, 0], // from 100 to 250
      delay: 0,
      direction: "alternate",
      loop: true,
    });
  };

  useEffect(() => {
    Anime();
  }, []);

  return (
    <>
      <div className="dashboard">
        <div className="front-page">
          <h1 className="site-title"> NFL Poolhost </h1>
          <p className="description">
            {" "}
            Make the NFL season more exciting by joining NFL Poolhost{" "}
          </p>
          <p className="description2">
            Football pick'em pools are a great way to add some more competition
            to the NFL season. Compete against other users and earn a spot on
            the leaderboard. NFL Poolhost is completely free to use. Just sign
            up, make your picks, and hope for the best!
          </p>

          <div className="button-container">
            <Link
              to="/Signup"
              className={currentUser ? "hide-link" : "menu-signin"}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className={currentUser ? "hide-link" : "menu-login"}
            >
              Log In
            </Link>
          </div>
        </div>
        <p className="version"> Version: Beta </p>
      </div>
    </>
  );
}
