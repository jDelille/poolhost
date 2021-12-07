import firebase from 'firebase/app';
import "firebase/auth"
import 'firebase/firestore'

const app = firebase.initializeApp({
 apiKey: "AIzaSyAOt1HxiwSrbA8yV8iQ-UiX3LHQR734AXs",
 authDomain: "auth-development-aa8c8.firebaseapp.com",
 databaseURL: "https://auth-development-aa8c8-default-rtdb.firebaseio.com",
 projectId: "auth-development-aa8c8",
 storageBucket: "auth-development-aa8c8.appspot.com",
 messagingSenderId: "996852505570",
 appId: "1:996852505570:web:92a349037866ee261cb7bb",
 measurementId: "G-46TN2CCMF4"
})

export const firebaseRef = firebase;
export const auth = app.auth();
export const firestore = app.firestore()

