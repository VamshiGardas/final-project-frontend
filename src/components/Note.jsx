import React from "react";
import "../CSS/Note.css"; //imports css styles

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  const textStyle = {
    fontFamily: props.font
  };

  return (
    <div className="note">
      <span className="note-id"> {props.id + 1} </span>
      <h1 style={textStyle}>{props.title}</h1>
      <p style={{ ...textStyle, color: props.color }}>{props.content}</p>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Note;
