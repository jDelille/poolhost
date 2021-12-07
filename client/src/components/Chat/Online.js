import React from 'react'
import { auth } from '../Firebase/firebase'
import firebase from 'firebase'
import './Online.css'

function Online() {

 let uid = firebase.auth().currentUser.uid
 let db = firebase.firestore()











 return (
  <>
  <div className="online-box">
   <div className="survey-box">
    <h4> AFC Winner </h4>
    <div> Kansas City Chiefs </div>
    <div> Baltimore Ravens </div>
    <div> Tennessee Titans </div>
    <div> New England Patriots </div>
   </div>
  
  <div className="survey-box">
    <h4> NFC Winner </h4>
    <div> Kansas City Chiefs </div>
    <div> Baltimore Ravens </div>
    <div> Tennessee Titans </div>
    <div> New England Patriots </div>
   </div>
   </div>
  </>
 )
}

export default Online
