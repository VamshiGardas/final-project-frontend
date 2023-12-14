import React from "react"; // imports react to enable jsx syntax
import "../CSS/Header.css"; //imports css styles
import LOGO from "../DATA/LOGO.jpeg"; //imports logo from data directory

function Header() {
  //JSX for header component
  return (
    <div className="header">
      <img src={LOGO} alt="Company Logo" className="header-logo" />
      <h1>Notes</h1>
    </div>
  );
}

export default Header; // exporting Header component
