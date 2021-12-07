import React, {useState, useEffect} from 'react'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { auth, firebaseRef, firestore } from '../Firebase/firebase'
import MessageCard from './MessageCard';
import { useAuth } from '../../context/AuthContext';
import NFL from '../Gamebar/Nfl'
import Header from '../Navbar/Header'
import firebase from 'firebase';
import Online from './Online';

import './Chat.css'

export default function Chat({currentRoom}) {
 const [userPicks, setUserPicks] = useState([])
 const [message, setMessage] = useState('');
 const userUID = auth.currentUser.uid;
 const { currentUser } = useAuth();


 const messagesRef = firestore.collection('messages');

 const query = messagesRef.orderBy('createdAt', 'asc')

 const [messages] = useCollectionData(query, { idField: 'id' });


 const handleSubmit = async (e) => {
  e.preventDefault()
  const { uid, photoURL } = auth.currentUser;
  const createdAt = firebaseRef.firestore.FieldValue.serverTimestamp();
  await messagesRef.add({
   uid,
   photoURL,
   createdAt,
   text: message,
   email: currentUser.email
  });
  setMessage('');
 };




 const handleDelete = (createdAt, id) => {
  firestore.collection('messages').doc(id).delete()
 }


 return (
  <div className='chat-window' >
  <div className="chat-page-content">
  {/* <Online /> */}
  <div className='chat'>
    <div className="messages">
   {messages &&
    messages.map((message) => {
    return <MessageCard 
      message={message}
      key={message.id}
      handleDelete={handleDelete}
     />
    })}
    

  
     </div>
     <div className='type-message'>
     <form onSubmit={handleSubmit}>
      <textarea
       value={message}
       onChange={(e) => setMessage(e.target.value)}
       placeholder="Enter message"
      />
      <button className="send-msg" type="submit" disabled={!message}>
       Send
      </button>
     </form>
     </div>
     </div> 
  </div>
  </div>
 )
}
