// This is set to intial page
import React from "react"; // imports react to enable JSX syntax
import { auth } from "../firebaseconfig"; // Imports firebase config
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import the necessary methods
import Header from "./Header"; // imports header component
import "../CSS/Home.css"; // imports CSS styles

function Home({ onGuestAccess }) {
  // Function to handle sign-in with Google
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
  //JSX for Home component
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

export default Home; // exporting Home component
