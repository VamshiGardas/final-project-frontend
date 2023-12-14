import React, { useState, useEffect } from "react"; //importing react,usestate and useEffect from react
import axios from "axios"; // importing axios to make http requests
import { auth } from "../firebaseconfig"; // importing firebaseconfig file to setup signin with google
import Header from "./Header"; // importing header component
import Footer from "./Footer"; // importing footer component
import Note from "./Note"; // importing footer component
import CreateArea from "./CreateArea"; // importing createArea component
import Home from "./Home"; // importing Home component(intial page)
import "../CSS/App.css"; // importing css styles

// Deployed backend URL from railway platform
const backendUrl = "https://final-porject-backend-production.up.railway.app";

// State for storing notes, user login status, loading status, and errors
function App() {
  const [noteArray, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state for error handling

  // check and set login status
  useEffect(() => {
    const isGuestLoggedIn = localStorage.getItem("isGuestLoggedIn") === "true";
    if (isGuestLoggedIn) {
      setIsLoggedIn(true);
    }
    // fetch notes from backend(railway)
    axios
      .get(`${backendUrl}/notes`)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error); //  error state
      })
      .finally(() => setLoading(false));
    // Set up Firebase authentication listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        localStorage.removeItem("isGuestLoggedIn");
      } else if (!isGuestLoggedIn) {
        setIsLoggedIn(false);
      }
    });

    // Clean up the authentication listener on component unmount
    return () => unsubscribe();
  }, []);

  // add a new note
  function addNote(newNote) {
    axios
      .post(`${backendUrl}/notes`, newNote)
      .then((response) => {
        setNotes((prevNotes) => [...prevNotes, response.data]);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error); //  error state
      });
  }

  // delete a note
  function deleteNote(id) {
    axios
      .delete(`${backendUrl}/notes/${id}`)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error); //  error state
      });
  }

  // handle guest access
  function handleGuestAccess() {
    setIsLoggedIn(true);
    localStorage.setItem("isGuestLoggedIn", "true");
  }
  // handle user logout
  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("isGuestLoggedIn");
  }
  // render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // render main app UI
  return (
    <div className="app-container">
      {error && <div className="error-message">Error: {error.message}</div>}
      {isLoggedIn ? (
        <>
          <Header />
          <CreateArea onAdd={addNote} onLogout={handleLogout} />
          <div className="notes-section">
            {noteArray.map((note, index) => (
              <Note
                key={index}
                id={index}
                title={note.title}
                content={note.content}
                font={note.font}
                color={note.color}
                onDelete={() => deleteNote(note._id)}
              />
            ))}
          </div>
          <Footer />
        </>
      ) : (
        <Home onGuestAccess={handleGuestAccess} />
      )}
    </div>
  );
}

export default App; // exporting App component
