import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebaseconfig";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Home from "./Home";
import "../CSS/App.css";

// Full backend URL with https://
const backendUrl = "https://final-porject-backend-production.up.railway.app";

function App() {
  const [noteArray, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isGuestLoggedIn = localStorage.getItem("isGuestLoggedIn") === "true";
    if (isGuestLoggedIn) {
      setIsLoggedIn(true);
    }

    axios
      .get(`${backendUrl}/notes`)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
      })
      .finally(() => setLoading(false));

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        localStorage.removeItem("isGuestLoggedIn");
      } else if (!isGuestLoggedIn) {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  function addNote(newNote) {
    axios
      .post(`${backendUrl}/notes`, newNote)
      .then((response) => {
        setNotes((prevNotes) => [...prevNotes, response.data]);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
      });
  }

  function deleteNote(id) {
    axios
      .delete(`${backendUrl}/notes/${id}`)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
      });
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

export default App;
