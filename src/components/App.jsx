import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebaseconfig"; // Import Firebase auth
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Home from "./Home"; // Import the new Home component
import "../CSS/App.css";

function App() {
  const [noteArray, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    // Check if the user is logged in as a guest
    const isGuestLoggedIn = localStorage.getItem("isGuestLoggedIn") === "true";
    if (isGuestLoggedIn) {
      setIsLoggedIn(true);
    }

    // Fetch notes from the backend
    axios
      .get("http://localhost:5000/notes")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => console.error("Error:", error));

    // Subscribe to Firebase auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        localStorage.removeItem("isGuestLoggedIn"); // Remove guest flag if logged in with Firebase
      } else if (!isGuestLoggedIn) {
        setIsLoggedIn(false);
      }
      setLoading(false); // Set loading to false after auth state is determined
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  function addNote(newNote) {
    axios
      .post("http://localhost:5000/notes", newNote)
      .then((response) => {
        setNotes((prevNotes) => [...prevNotes, response.data]);
      })
      .catch((error) => console.error("Error:", error));
  }

  function deleteNote(id) {
    axios
      .delete(`http://localhost:5000/notes/${id}`)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      })
      .catch((error) => console.error("Error:", error));
  }

  function handleGuestAccess() {
    setIsLoggedIn(true);
    localStorage.setItem("isGuestLoggedIn", "true"); // Set a flag in localStorage
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("isGuestLoggedIn"); // Clear the guest flag from localStorage
  }

  if (loading) {
    return <div>Loading...</div>; // Display loading message while waiting for auth state
  }

  return (
    <div className="app-container">
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

export default App;
