import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var config = {
    apiKey: "AIzaSyBn4852nDlVgaSJuTGVaPcRXrQEBQDmKQ4",
    authDomain: "vue-firebase-phonebook-891c8.firebaseapp.com",
    databaseURL: "https://vue-firebase-phonebook-891c8.firebaseio.com",
    projectId: "vue-firebase-phonebook-891c8",
    storageBucket: "vue-firebase-phonebook-891c8.appspot.com",
    messagingSenderId: "971439960005"
}

firebase.initializeApp(config);

const database = firebase.firestore();
const googleAuthProvider =  new firebase.auth.GoogleAuthProvider();


export { googleAuthProvider, firebase, database as default }

