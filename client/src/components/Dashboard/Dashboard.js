import React, {useState, useRef, useEffect} from 'react'
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from "react-router-dom";
import Header from '../Navbar/Header';
import NFL from '../Gamebar/Nfl';
import '../Firebase/Signup.css'
import UserPicks from '../User-Picks/UserPicks';
import Chat from '../Chat/Chat';
import Logo from '../Navbar/logo.svg'
import './Dashboard.css'
import {lightTheme, darkTheme, GlobalStyles} from '../Themes.js'
import styled, {ThemeProvider} from 'styled-components'
import {AiOutlineDown} from 'react-icons/ai'
import Anime, { anime } from 'react-anime';
import RiveIcons from './Rive/Crown';
import Check from './Rive/Check'
import Write from './Rive/Write';
import gsap from 'gsap';



export default function Dashboard() {
    
    const { currentUser, logout } = useAuth();
    const [currentRoom, setCurrentRoom] = useState("Chop Talk ")
    const [darkMode, setDarkMode] = useState(false)

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

    const [theme, setTheme] = useState('light');
    const StyledApp = styled.div``
  
  
    const Anime = () => {
        anime({
            targets: '.down-arrow',
            translateY: [10, 0], // from 100 to 250
            delay: 0,
            direction: 'alternate',
            loop: true
          });
    }
    

      useEffect(() => {
        Anime()
      }, [])


      //gsap

    return (
        <>
   
            <div className="dashboard">
            
            <div className="front-page">
                <h1 className="site-title"> NFL Poolhost </h1>
                <p className="description"> Make the NFL season more exciting by joining NFL Poolhost </p>
                <p className="description2">
                    Football pick'em pools are a great way to add some more competition to the NFL season. Compete against other users and earn a spot on the leaderboard. NFL Poolhost is completely free to use. Just sign up, make your picks, and hope for the best!
                </p>
               
                <div className="button-container">
                    <Link to="/Signup" className={currentUser ? 'hide-link' : "menu-signin"}>Sign Up</Link>
                    <Link to="/login" className={currentUser ? 'hide-link' : "menu-login"}>Log In</Link>
                </div>
                <div className="view-more-container">
                    <h1> Learn More </h1>
                    <AiOutlineDown className="down-arrow"/>
                </div>
                
            </div>
            <section className="website-info">
            <div className="info-box-container">
                <div className="info-box">
                    <Check />
                    <h1> Create an account </h1>
                    <p> Sign up with your email to get started. </p>
                </div>
                <div className="info-box">
                    <Write />
                    <h1> Make Picks </h1>
                    <p>  Make your picks each week. </p>
                </div>
                <div className="info-box">
                    <RiveIcons />
                    <h1> Compete </h1>
                    <p>  Compete for a spot on the leaderboard.  </p>
                </div>
            </div>

            <div className="get-started-container">
            <Link to="/signup" className="link member-link"> Get Started </Link>
            </div>
                    
            </section>
        </div>
        </>
    )
}
