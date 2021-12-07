import React, {useState} from 'react'
import { auth } from '../Firebase/firebase';
import {useAuth} from '../../context/AuthContext'
import './MessageCard.css'

export default function MessageCard({message, handleDelete}) {
 const {displayName, photoURL} = auth.currentUser.uid
 const { id, text, uid, createdAt, email } = message;
 const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
 const [showActionsButtons, setShowActionsButtons] = useState(false);

 


 const toggleCard = () => {
  setShowActionsButtons(!showActionsButtons)
 };

 return (
  <>
   <div className={`message ${messageClass}`}>
   <div className="content" onClick={toggleCard}>
    <div className="user-name">
     <p>{email}</p>
    </div>
    
    <div className="text">
     <p>{text}</p> 
    </div>
    <div 
    style={{display: showActionsButtons ? 'block' : 'none'}}
    className='actions'
    >
     <button 
     className="delete-chat-btn"
     onClick={() => handleDelete(createdAt, id)}> Delete </button>
    </div>
   </div>
   </div>
  </>
 )
}
