import React from "react"; // imports react to enable JSX syntax
import "../CSS/Note.css"; //imports css styles

function Note(props) {
  // Function to handle the delete button click
  function handleClick() {
    props.onDelete(props.id); // Calls the onDelete function passed via props with the note's id
  }

  // Dynamic styling for the text, using the font style passed in props
  const textStyle = {
    fontFamily: props.font,
  };

  //JSX for Note compoent
  return (
    <div className="note">
      <span className="note-id"> {props.id + 1} </span>
      <h1 style={textStyle}>{props.title}</h1>
      <p style={{ ...textStyle, color: props.color }}>{props.content}</p>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Note; // exporting Note component
