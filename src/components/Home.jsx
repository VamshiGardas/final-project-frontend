import React from "react";
import { auth } from "../firebaseconfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import the necessary methods
import Header from "./Header";
import "../CSS/Home.css";

function Home({ onGuestAccess }) {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider(); // Create a GoogleAuthProvider object
    signInWithPopup(auth, provider) // Use signInWithPopup method for authentication
      .then((result) => {
        // Handle successful authentication here
      })
      .catch((error) => {
        // Handle errors here
      });
  };

  return (
    <div>
      <Header />
      <div className="login-form">
        <button onClick={signInWithGoogle}>Login with Google</button>
        <button onClick={onGuestAccess}>Guest</button>
      </div>
    </div>
  );
}

export default Home;
