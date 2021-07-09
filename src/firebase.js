import firebase from "firebase/app";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB7uLpFSJF-tcOEWN97g6REQ07glPAQetY",
    authDomain: "personnes-19c7f.firebaseapp.com",
    projectId: "personnes-19c7f",
    storageBucket: "personnes-19c7f.appspot.com",
    messagingSenderId: "729526712367",
    appId: "1:729526712367:web:c015792cda4c3f2f0deeda",
    measurementId: "G-VHX7SKT6B5"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;