import React, { useState } from "react"; //Importing a useState hook and react to enable jsx syntax
import { auth } from "../firebaseconfig"; // Import Firebase auth
import "../CSS/CreateArea.css"; // imports css styles

//State to keep track of the note's details (title, content, font, color)
function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    font: "Arial",
    color: "black",
  });

  // Handler for input changes, updates the note state
  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  // Handler for submitting the note
  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
      font: "Arial",
      color: "black",
    }); // Resets the note state to default after submission
    event.preventDefault(); // Prevents the default form submission behavior
  }

  // Handler for user logout
  function handleLogout() {
    auth.signOut().then(() => {
      // Call a function passed via props to handle post-logout behavior (like updating state in App.jsx)
      if (props.onLogout) {
        props.onLogout();
      }
    });
  }

  // JSX for the component's UI
  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <select name="font" onChange={handleChange}>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
        <input
          type="color"
          name="color"
          value={note.color}
          onChange={handleChange}
        />
        <button onClick={submitNote}>Add</button>
      </form>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default CreateArea; // exporting CreateArea component
