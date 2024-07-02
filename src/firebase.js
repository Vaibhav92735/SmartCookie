// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXnYylDc1y6-x5rvpITznxhMOZ_Y09z-Y",
  authDomain: "usclgs-7ea8b.firebaseapp.com",
  projectId: "usclgs-7ea8b",
  storageBucket: "usclgs-7ea8b.appspot.com",
  messagingSenderId: "950207572332",
  appId: "1:950207572332:web:c1bdd8b81c215a26696b49",
  measurementId: "G-561J84FM30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, storage, ref, listAll, getDownloadURL };