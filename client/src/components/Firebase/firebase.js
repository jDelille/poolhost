import firebase from 'firebase/app';
import "firebase/auth"
import 'firebase/firestore'

const app = firebase.initializeApp({
  apiKey: "AIzaSyCJE0YDdSWqqp2W_dgSgpSslPfJZyZQrOQ",
  authDomain: "sockhost-3a550.firebaseapp.com",
  databaseURL: "https://sockhost-3a550-default-rtdb.firebaseio.com",
  projectId: "sockhost-3a550",
  storageBucket: "sockhost-3a550.appspot.com",
  messagingSenderId: "77594944906",
  appId: "1:77594944906:web:d71872fb879e23257c9473"
})

export const firebaseRef = firebase;
export const auth = app.auth();
export const firestore = app.firestore()

