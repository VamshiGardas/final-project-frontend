import React from "react"; // Importing React to enable JSX syntax and component creation
import "../CSS/Footer.css"; //imports css styles

function Footer() {
  // Dynamically calculates the current year to keep the copyright notice updated
  const year = new Date().getFullYear();
  //JSX for footer component
  return (
    <footer>
      <p>Copyright © {year}</p>
    </footer>
  );
}

export default Footer; //Exporting the Footer component
