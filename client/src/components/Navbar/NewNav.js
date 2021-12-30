import React, {useEffect, useState,} from 'react'
import {useAuth} from '../../context/AuthContext'
import { Link, useHistory } from "react-router-dom";
import {GrMenu} from 'react-icons/gr'
import { auth } from '../Firebase/firebase';
import firebase from 'firebase';
import {FiSettings} from 'react-icons/fi'
import {FiLogOut} from 'react-icons/fi'
import './Header.css'
import {lightTheme, darkTheme, GlobalStyles} from '../Themes.js'
import styled, {ThemeProvider} from 'styled-components'
import gsap from 'gsap';


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

    const [userPicks, setUserPicks] = useState([])

    //  get data from the user picks array in collection
    
//   function fetchPicks() {
//     let db = firebase.firestore()
//     let usersEmail = auth?.currentUser?.email
//     const userUID = auth?.currentUser?.uid;
//     {currentUser ? (
//         db?.collection('users')?.where('email', '==', usersEmail)?.get()
//         .then(function(querySnapshot) {
//           querySnapshot.forEach(function(doc) {
//             setUserPicks(doc.data())
//           })
//         })
//     ):(
//         console.log('yup')
//     )}
    
//   }

//   useEffect(() => {
//       fetchPicks()
//   }, [])

  console.log(userPicks?.picks?.length)


//   if(userPicks[0].picks.length < 17) {
//       console.log('less than 17')
//   } else if (userPicks[0].picks.length === 17) {
//     console.log('all picks in')
//   } else {
//       console.log('error')
//   }

    //dark mode | light mode
    const [theme, setTheme] = useState('light');
    const StyledApp = styled.div``
    const themeToggler = () => {
      theme === 'light' ? setTheme('dark') : setTheme('light');
    }
    const toggleSwitch = () => {
        toggler ? gsap.to(".switch", { x: 40, duration: 0.5}) : gsap.from(".switch", { x: 40, duration: 0.5}) 
    }

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
                        </Link>
                    </div>
                    <ul className="nav-links">
                        <Link to="/picks" className="link">Picks</Link>
                        <Link to="/expert-picks" className="link">Pool</Link>
                        <Link to="/chat" className="link">Chat</Link>
                        <Link to="/about" className="link">About</Link>

                    </ul>
                    <GrMenu className="menu" onClick={() => setToggleMenu(!toggleMenu)}/>
                    <div className={toggleMenu ? "menu-box" : 'hide-link' }>
                    {currentUser ? (
                        <>
                        
                        </>
                    ): (
                        ''
                    )}
                        <ul className="nav-links-mobile">
                            <Link to="/expert-picks" className="link">Pool</Link>
                            <Link to="/chat" className="link">Chat</Link>
                        </ul>
                        <div className='nav-menu-signup'>
                            <Link to="/Signup" className={currentUser ? 'hide-link' : "menu-signin"}>Sign Up</Link>
                            <Link to="/login" className={currentUser ? 'hide-link' : "menu-login"}>Log In</Link>
                        </div>
                        <div className='nav-menu-other'>
                            <Link to="/update-profile" className={currentUser ? "update-profile-btn" : "hide-link"}> Update Profile</Link>
                            <Link to="/picks" className="link">Picks</Link>


                            <div className='theme-toggler'>
                            <h5> Dark Mode </h5>
                            <div 
                                className="toggler-icon"
                                onClick={() => {setToggler(!toggler); themeToggler()}}
                            >
                                <div className="switch"></div>
                            </div>
                        </div>
                        </div>
                        
                        <p className={currentUser ? "menu-logout" : 'hide-link'} onClick={handleLogout}><FiLogOut />Log Out</p>
                        
                        
                    </div>
                </nav>
              
            </StyledApp>
            </ThemeProvider>
        </>
    )
}
