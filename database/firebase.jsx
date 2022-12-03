import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { initializeApp } from "firebase/compat/app";
const firebaseConfig = {
  apiKey: "AIzaSyDJjlPYJFbVPmxG-ANsmxegi_UP9tafA74",
  authDomain: "appchatdemo-b10d1.firebaseapp.com",
  projectId: "appchatdemo-b10d1",
  storageBucket: "appchatdemo-b10d1.appspot.com",
  messagingSenderId: "1001878841681",
  appId: "1:1001878841681:web:9ee6538cff4efcae86cb70",
  measurementId: "G-00TBBHTPVC"
};
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
