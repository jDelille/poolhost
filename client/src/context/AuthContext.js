import React, { useContext, useState, useEffect, createContext } from 'react'
import { auth } from '../components/Firebase/firebase'
import firebase from 'firebase';

const AuthContext = createContext()
export default AuthContext;


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        let noob = auth.createUserWithEmailAndPassword(email, password)
        noob.then(function () {
            let userUID = auth.currentUser.uid;
            let db = firebase.firestore();

            db.collection('users').doc(userUID).set({
                email: email,
                displayName: null,
                picks: [],
                record: 0,
                photoURL: 'https://busheyautomotive.com/wp-content/uploads/2016/02/default-profile-pic-300x300.png'
            })
        })
        
    }

    function login(email, password) {
        auth.signInWithEmailAndPassword(email, password)
        // member.then(function () {
        //     let userUID = auth.currentUser.uid;
        //     let db = firebase.firestore();

        //     db.collection('users').doc(userUID).set({
        //         email: email,
        //         displayName: null
                
        //     })
        // })
    }

    function logout() {
          
        auth.signOut();

    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribed
    }, [])
    
    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {/* if we are not loading, then render the children */}
            {!loading && children}
        </AuthContext.Provider>
    )
}

