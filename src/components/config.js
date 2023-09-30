

import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBL_MdqrpSzeJD2LreHBEYUbe8dyh5eht4",
  authDomain: "react-app-496e2.firebaseapp.com",
  projectId: "react-app-496e2",
  storageBucket: "react-app-496e2.appspot.com",
  messagingSenderId: "850684194767",
  appId: "1:850684194767:web:7bc76861fbc54462e7ecba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth , provider};