import React, {useState, useEffect} from 'react'
import Header from '../Navbar/Header'
import NFL from '../Gamebar/Nfl'
// import './UserPicks.css'
import './MakePicks.css'
import firebase from 'firebase'
import { useAuth } from '../../context/AuthContext';
import { auth, firestore } from '../Firebase/firebase'
// import Games from './Games'
import MakePicks from './MakePicks'
import {lightTheme, darkTheme, GlobalStyles} from '../Themes.js'
import styled, {ThemeProvider} from 'styled-components'
import UpdatedPicks from './UpdatedPicks'

function UserPicks() {

  let [pick, setPick] = useState('')
  const [newData, setNewData] = useState([])
  let [counter, setCounter] = useState(0)
  let [game, setGame] = useState('')


  // add picks to user collection in firestore
   const addPicks = () => {
    const userUID = auth.currentUser.uid;
    let db = firebase.firestore();
    db.collection('users').doc(userUID).collection('picks').doc('user_picks').update({
        game: firebase.firestore.FieldValue.arrayUnion(game),
    })
    db.collection('users').doc(userUID).update({
      picks: firebase.firestore.FieldValue.arrayUnion(pick),
  })
    
  }
  

  addPicks()

  console.log(pick)
  

   

  // get data from firestore collection onto page
  async function getStuff() {
    let db = firebase.firestore()
    const userUID = auth.currentUser.uid;
    let things = await db.collection('users').get();
    return things.docs.map(doc => setNewData(doc.data()))
  }

  // get data from firestore collection onto page
  async function countPicks() {
    let db = firebase.firestore()
    const userUID = auth.currentUser.uid;
    let things = await db.collection('users').doc
    (userUID).collection('picks').get();
    console.log(things.length)
  }

  countPicks()

   // clear picks to user collection in firestore
   const clearPicks = () => {
    const userUID = auth.currentUser.uid;
    let db = firebase.firestore();
    db.collection('users').doc(userUID).update({
        picks: firebase.firestore.FieldValue.arrayRemove()
    })
  }

    const [endOfPicks, setEndOfPicks] = useState(false)

    if(counter < 0) {
      counter = 0
    } else if(counter > 16) {
      counter = 16
      
    }

    console.log(counter)



  // add useEffect to avoid infinite loop
  useEffect(() => {
    getStuff()
  }, [])

  
  return (
    <>
      {/* <button
        onClick={clearPicks()}> Clear Picks </button> */}
       {endOfPicks ? <h1>hey</h1> : <MakePicks setPick={setPick} counter={counter} setCounter={setCounter} addPicks={addPicks} endOfPicks={endOfPicks} setGame={setGame} setEndOfPicks={setEndOfPicks} />}
       {/* <UpdatedPicks /> */}

    </>
  )
}

export default UserPicks
