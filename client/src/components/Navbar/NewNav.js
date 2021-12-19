import React, {useEffect, useState,} from 'react'
import {useAuth} from '../../context/AuthContext'
import { Link, useHistory } from "react-router-dom";
import { auth } from '../Firebase/firebase';
import {GrMenu} from 'react-icons/gr'
import {FiSettings} from 'react-icons/fi'
import {FiLogOut} from 'react-icons/fi'
import Logo from './logo.svg'
import firebase from 'firebase';
import './Header.css'
import {lightTheme, darkTheme, GlobalStyles} from '../Themes.js'
import styled, {ThemeProvider} from 'styled-components'
import gsap from 'gsap';
import {BsMoonStars} from 'react-icons/bs'
import {BsFillSunFill} from 'react-icons/bs'





export default function Header() {

    const { currentUser, logout } = useAuth();
    const [error, setError] = useState('')
    const [toggleMenu, setToggleMenu] = useState(false)
    const history = useHistory()
    const [toggler, setToggler] = useState(false)

    const [signedIn, setSignedIn] = useState([])

    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.pushState("/login")
        } catch {
            setError('failed to logout')
        }
    }

    const [theme, setTheme] = useState('light');
    const StyledApp = styled.div``
  
    const themeToggler = () => {
      theme === 'light' ? setTheme('dark') : setTheme('light');
    }


    const toggleSwitch = () => {
        toggler ? gsap.to(".switch", { x: 54, duration: 0.5}) : gsap.from(".switch", { x: 54, duration: 0.5})
        
    }

    
//   function fetchPicks() {
//     let db = firebase.firestore()
//     let usersEmail = auth.currentUser.email
//     const userUID = auth.currentUser.uid;
//     db.collection('users').where('email', '==', usersEmail).get()
//     .then(function(querySnapshot) {
//       querySnapshot.forEach(function(doc) {
//         setSignedIn(doc.data())
//       })
//     })

// }
// useEffect(() => {
   
//     fetchPicks()
// }, [])


    useEffect(() => {
        toggleSwitch()
        
    }, [toggler])

    return (
        <>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
            <StyledApp className="header">
                <nav>
                    <div className="brand">
                        <Link to="/" className="home-link">
                        Poolhost
                            {/* <img className="site-logo" src={Logo} alt="" /> */}
                        </Link>
                    </div>
                    <ul className="nav-links">
                    <Link to="/picks" className="link">Picks</Link>
                    <Link to="/expert-picks" className="link">Pool</Link>
                    <Link to="/chat" className="link">Chat</Link>
                    </ul>
                    {/* <h1 className="current-user-nav"> Signed in as {signedIn.displayName} <img className={"team-logo-picks"} src={`../icons/${signedIn.favoriteTeam}.svg`} alt='logo'/></h1> */}
                    <GrMenu className="menu" onClick={() => setToggleMenu(!toggleMenu)}/>
                    <div className={toggleMenu ? "menu-box" : 'hide-link' }>
                    {currentUser ? (
                        <>
                        
                        </>
                    ): (
                        ''
                    )}
                        <ul className="nav-links-mobile">
                            <Link to="/picks" className="link">Picks</Link>
                            <Link to="/expert-picks" className="link">Pool</Link>
                            <Link to="/chat" className="link">Chat</Link>
                        </ul>
                        <Link to="/Signup" className={currentUser ? 'hide-link' : "menu-signin"}>Sign Up</Link>
                        <Link to="/login" className={currentUser ? 'hide-link' : "menu-login"}>Log In</Link>
                        
                        {/* <p> Signed in as: {currentUser.email}</p> */}
                        <Link to="/update-profile" className="update-profile-btn"><FiSettings /> Update Profile</Link>
                        <p className={currentUser ? "menu-logout" : 'hide-link'} onClick={handleLogout}><FiLogOut />Log Out</p>
                        <div 
                            className="toggler-icon"
                            onClick={() => {setToggler(!toggler); themeToggler()}}
                        >
                        <p className="toggler-label-dark"> <BsMoonStars /> </p>
                        <p className='toggler-label-light'> <BsFillSunFill /> </p>
                        <div className="switch"></div>
                        </div>
                    </div>
                </nav>
              
            </StyledApp>
            </ThemeProvider>
        </>
    )
}
