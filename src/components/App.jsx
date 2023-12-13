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
  const [error, setError] = useState(null); // Added error state

  // Update the base URL to match your Railway backend deployment
  const BASE_URL = "https://friendly-table-production.up.railway.app"; // Replace with your Railway backend URL

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
      .catch((error) => {
        console.error("Error:", error);
        setError(error); // Update error state
      })
      .finally(() => {
        setLoading(false); // Update loading state
      });

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        localStorage.removeItem("isGuestLoggedIn");
      } else if (!isGuestLoggedIn) {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []); // Ensure this runs only once

  function addNote(newNote) {
    axios
      .post(`${BASE_URL}/notes`, newNote)
      .then((response) => {
        setNotes((prevNotes) => [...prevNotes, response.data]);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error); // Update error state
      });
  }

  function deleteNote(id) {
    axios
      .delete(`${BASE_URL}/notes/${id}`)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error); // Update error state
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

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        handleGuestAccess={handleGuestAccess}
      />
      {isLoggedIn ? (
        <div>
          <CreateArea onAdd={addNote} />
          {loading ? (
            <p>Loading notes...</p> // Loading indicator
          ) : error ? (
            <p>Error fetching notes. Please try again later.</p> // Error message
          ) : (
            noteArray.map((noteItem, index) => (
              <Note
                key={index}
                id={noteItem._id}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNote}
              />
            ))
          )}
        </div>
      ) : (
        <Home />
      )}
      <Footer />
    </div>
  );
}

export default App;
