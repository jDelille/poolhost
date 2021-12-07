import React, {useEffect, useState} from 'react'
import { auth } from '../Firebase/firebase'
import firebase from 'firebase'
import {useAuth} from '../../context/AuthContext'
import Crown from './leaderboard-icons/crown.png'
import './Leaderboard.css'


export default function Leaderboard() {
 const [userPicks, setUserPicks] = useState([])

 let db = firebase.firestore()
 function getAllData() {
   db.collection('users').get().then((querySnapshot) => {
     let users = []
     querySnapshot.forEach(doc => {
       users.push(doc.data())
     })
     setUserPicks(users)
   })
 }

 //SORT DATA FOR LEADERBOARD
 const [record, setRecord] = useState([])

 function sortByRecord() {
  db.collection('users').orderBy('record', 'desc').get()
  .then((querySnapshot) => {
    let leaders = []
    querySnapshot.forEach(doc => {
      leaders.push(doc.data())
    })
    setRecord(leaders)
  })
 }



 useEffect(() => {
  getAllData()
  sortByRecord()
}, [])


 return (
  <>
  <div className="leaderboard">
      <h1 className="leaderboard-title"> Leaderboard <br /> Top 10 </h1>
      <div className="top-three">
        <div className="third-place">
          <p> 3 </p>
          {record.map((item, index) => {
            if(index === 1) {
            return (
              <>
              {/* <p className="user-position"> {item.displayName} </p> */}
              <img className="avatar" src={item.photoURL} alt="avatar" />
              </>
            )
              
            } 
          })}  
        </div>
        <div className="first-place">
        {record.map((item, index) => {
            if(index === 0) {
            return(
              <>
              <img className="crown" src={Crown} alt="winner" />
                <img className="avatar" src={item.photoURL} alt="avatar" />
                {/* <p className="user-position"> {item.displayName} </p> */}
              </>
            ) 
            } 
          })}  
        </div>
        <div className="second-place">
          <p> 2 </p>
          {record.map((item, index) => {
            if(index === 2) {
            return (
              <>
              {/* <p className="user-position"> {item.displayName} </p> */}
              <img className="avatar" src={item.photoURL} alt="avatar" />
              </>
            )
            } 
          })} 
        </div>
      </div>
      <div className="losers">
      <div className="leaderboard-losers">
      <div className='position-num'>
              <h1>4</h1>
              <h1>5</h1>
              <h1>6</h1>
              <h1>7</h1>
              <h1>8</h1>
              <h1>9</h1>
              <h1>10</h1>
            </div>
      <div className="position-boxes">
      {record.map((item, index) => {
        if(index > 2 && index < 10) {
          return (
         
            
            <div className="position">
            
            <img className="loser-avatar" src={item.photoURL} alt="avatar" />
            <p className="user-position"> {item.displayName} </p>
          </div>
          
          )
        } 
      })}  
      </div>
      </div>
  </div>
  </div>
  </>
 )
}


