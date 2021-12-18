import firebase from 'firebase/app';
import "firebase/auth"
import 'firebase/firestore'

const app = firebase.initializeApp({
 apiKey: "AIzaSyA1OC29Qdh2eIiP6H-jqRoLj7EvjIN9xo8",
 authDomain: "poolhost-6513a.firebaseapp.com",
 databaseURL: "https://poolhost-6513a-default-rtdb.firebaseio.com",
 projectId: "poolhost-6513a",
 storageBucket: "poolhost-6513a.appspot.com",
 messagingSenderId: "722163122186",
 appId: "1:722163122186:web:90142bb15cf011baf81ff3"
})

export const firebaseRef = firebase;
export const auth = app.auth();
export const firestore = app.firestore()

