import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import additional methods for authentication

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdNODeIRi35RZgaVEhyCAaXw5iEWMguao", //API key
  authDomain: "notes-app-8b60b.firebaseapp.com", // authDomain
  projectId: "notes-app-8b60b", // projectId
  storageBucket: "notes-app-8b60b.appspot.com", // storafeBucket
  messagingSenderId: "469534609265", // messagingSenderId
  appId: "1:469534609265:web:255a54f518609adacc30d0", // appId
  measurementId: "G-XZLJ4RK12T", // measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth

export { auth, GoogleAuthProvider, signInWithPopup }; // Export the auth object along with GoogleAuthProvider and signInWithPopup
