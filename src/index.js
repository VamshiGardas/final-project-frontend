import React from "react"; //Importing React to enable the use of JSX and React features
import ReactDOM from "react-dom"; // Importing ReactDOM, which provides DOM-specific methods
import App from "./components/App.jsx"; // Importing the App component from the components folder

// Rendering the React application to the DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") //Targeting the 'root' div element in your HTML to mount the React app
);
