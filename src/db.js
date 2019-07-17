import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

/* firebase */
const firebaseConfig = {
    apiKey: "AIzaSyBLkR4b40WH8Z0TrfZ_PsMnvZxA2u5A7pE",
    authDomain: "chat-firebase-69076.firebaseapp.com",
    databaseURL: "https://chat-firebase-69076.firebaseio.com",
    projectId: "chat-firebase-69076",
    storageBucket: "chat-firebase-69076.appspot.com",
    messagingSenderId: "151991030717",
    appId: "1:151991030717:web:c3f61d4ddae60e28"
};

// Get a Firestore instance
const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp
