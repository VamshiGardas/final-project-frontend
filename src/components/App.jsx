import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebaseconfig";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Home from "./Home";
import "../CSS/App.css";

function App() {
  const [noteArray, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Update the base URL to match your Railway backend deployment
  const BASE_URL = "https://your-railway-backend-url"; // Replace with your Railway backend URL

  useEffect(() => {
    const isGuestLoggedIn = localStorage.getItem("isGuestLoggedIn") === "true";
    if (isGuestLoggedIn) {
      setIsLoggedIn(true);
    }

    axios
      .get(`${BASE_URL}/notes`)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => console.error("Error:", error));

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        localStorage.removeItem("isGuestLoggedIn");
      } else if (!isGuestLoggedIn) {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  function addNote(newNote) {
    axios
      .post(`${BASE_URL}/notes`, newNote)
      .then((response) => {
        setNotes((prevNotes) => [...prevNotes, response.data]);
      })
      .catch((error) => console.error("Error:", error));
  }

  function deleteNote(id) {
    axios
      .delete(`${BASE_URL}/notes/${id}`)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      })
      .catch((error) => console.error("Error:", error));
  }

  function handleGuestAccess() {
    setIsLoggedIn(true);
    localStorage.setItem("isGuestLoggedIn", "true");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("isGuestLoggedIn");
  }

  if (loading) {
    return <div>Loading...</div>;
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
