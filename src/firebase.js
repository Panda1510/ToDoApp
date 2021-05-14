import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC8t86V1XwujCQtOYXIORIUXXrldunQRno",
  authDomain: "todoapp-4ebeb.firebaseapp.com",
  projectId: "todoapp-4ebeb",
  storageBucket: "todoapp-4ebeb.appspot.com",
  messagingSenderId: "511340309892",
  appId: "1:511340309892:web:6a11cb2caf6972fdf881d1",
});

const db = firebaseApp.firestore();

export default db;
