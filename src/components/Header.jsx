import React from "react";
import "../CSS/Header.css"; //imports css styles
import LOGO from "../DATA/LOGO.jpeg"; //imports logo

function Header() {
  return (
    <div className="header">
      <img src={LOGO} alt="Company Logo" className="header-logo" />
      <h1>Notes</h1>
    </div>
  );
}

export default Header;
