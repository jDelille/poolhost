import React, {useState, useEffect, useRef} from 'react';
import NFL from '../Gamebar/Nfl'
import Header from '../Navbar/Header'
import './Expert.css'
import { gsap } from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { auth } from '../Firebase/firebase'
import firebase from 'firebase'
import { getAuth } from 'firebase/firebase-auth'
import {useAuth} from '../../context/AuthContext'
import Leaderboard from './Leaderboard'

gsap.registerPlugin(ScrollTrigger)

export default function Expert() {

  const [data, setData] = useState(); 
  const [matches, setMatches] = useState([])
  const [newData, setNewData] = useState([])
  const [userPicks, setUserPicks] = useState([])
  const [currentPicks, setCurrentPicks] = useState([])
  const [signedInPicks, setSignedInPicks] = useState([])

  const [showAllPicks, setShowAllPicks] = useState([])

  const user = firebase.auth().currentUser;


  useEffect(() => {
    fetch(`/expert`)
      .then((res) => res.json())
      .then((data) => {
          setData(data.picks)
          
      })
  }, [])

  useEffect(() => {
    fetch(`/gamebar`)
      .then((res) => res.json())
      .then((data) => {
          setMatches(data.sports[0].leagues[0].events)
          
      })
  }, [])

   // get data from firestore collection onto page
   async function getStuff() {
    let db = firebase.firestore()
    const userUID = auth.currentUser.uid;
    let things = await db.collection('users').get();
    return things.docs.map(doc => setNewData(doc.data()))
    
  }

  


  // //show signed in users picks
  // async function fetchUserPicks() {
  //   const userUID = auth.currentUser.uid;
  //   const token = await firebase.firestore().collection('users')
  //   return token.docs.map(doc => setCurrentPicks(doc.data()))
  // }

  // console.log(currentPicks)

 

 //get data from the user picks array in collection

  function fetchPicks() {
  let db = firebase.firestore()
  let usersEmail = auth.currentUser.email
  const userUID = auth.currentUser.uid;
  db.collection('users').where('email', '==', usersEmail).get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      setSignedInPicks(doc.data())
    })
  })
 
}

  
 

  
  // get data from other users
  async function countPicks() {
    let db = firebase.firestore()
    const userUID = auth.currentUser.uid;
    let things = await db.collection('users').doc(userUID)
    setCurrentPicks(things)
  }
  

  function getAllData() {
    let db = firebase.firestore()
    db.collection('users').get().then((querySnapshot) => {
      let users = []
      querySnapshot.forEach(doc => {
        users.push(doc.data())
      })
      setUserPicks(users)
    })
  }

  // function getUserData() {
  //   let db = firebase.firestore()
  //   const userUID = auth.currentUser.uid;

  //   db.collection('users').doc(userUID).get().then(() => {
  //     let users = []
  //       users.push(doc.data())
  //     })
  //     setCurrentPicks(users)
  //   }




  
 
  
  let newArray=[userPicks]

  // add useEffect to avoid infinite loop
  useEffect(() => {
    getStuff()
    fetchPicks()
    getAllData()
    countPicks()
  }, [])



  const label = useRef()

  const { currentUser, logout } = useAuth();






   return (
    <>
    <div className="expert-page">
    <Leaderboard />
    <div className="pick-chart">
    <div className="show-picks">
     <div className="expert-labels-container" ref={label}>
      <div className="labels">
        <div className="ex-labels">
          <h1> User </h1>
        </div>
      </div>
   
      
      <div className="expert-labels-games">
      {/* map through the matches data to get logos */}
        {matches?.map(item => {
          return(
            <>
            <div className="display-games">
            {/* <img 
              className={parseInt(item.competitors[0].score) > parseInt(item.competitors[1].score) ? 'winner': parseInt(item.competitors[0].score) === parseInt(item.competitors[1].score) ? 'tied' : 'loser'} 
              src={`../icons/${item.competitors[0].abbreviation}.svg`} alt='logo' 
            /> */}
            <h1> {item.competitors[0].abbreviation} </h1>
            <h1> VS </h1>  
            {/* <img className={parseInt(item.competitors[1].score) > parseInt(item.competitors[0].score) ? 'winner': parseInt(item.competitors[1].score) === parseInt(item.competitors[0].score) ? 'tied' : 'loser'}  src={`../icons/${item.competitors[1].abbreviation}.svg`} alt='logo' /> */}
            <h1> {item.competitors[1].abbreviation} </h1>
            </div>
            </>
          )
        })}
      </div>
    </div>
    {/* CURRENT USER picks populated with picks from data */}
     <div className="expert-picks-container">
     <div className="user-bar">
          <div className="expert-info">
            <div className="expert-name">
              <h1 className="affiliation"> Your Picks</h1>
            </div>
         </div> 
         <div className="expert-picked-teams">
         
         {signedInPicks?.picks?.map((item, index) => {
          
           if(index !== 0 ){
            return (
            <div className={item.length === 0 ?'hide-user-picks' : "show-user-pick"}>
              <img className={"team-logo-picks"} src={`../icons/${item}.svg`} alt='logo'/>
            </div>
            )
           
           }
        })}
         </div>
         </div>

      {/* SHOW ALL USER PICKS */}
      {userPicks.map(item => {
       return (
         <>
        <div className="expert-bar">
          <div className="expert-info">
            <div className="expert-name">
              <h1 className="affiliation"> {item.displayName}</h1>
            </div>
         </div>
          <div className="expert-picked-teams">
          {item.picks?.map((item, index) => {
            if(index !== 0) {
              return (
                <div className="show-user-pick">
                  <img className="team-logo-picks" src={`../icons/${item}.svg`} alt='logo'/>
                </div>
              )
            }
            
     
        })}
          </div>
          

     
         
         
         
    

          
            
         
        </div>
        </>
       )
      })}
      </div>
      </div>
     </div>
     </div>
    </>
   )
}