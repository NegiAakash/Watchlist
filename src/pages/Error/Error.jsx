// 404ErrorPage.jsx
import React from "react";
import "./Error.css";

const Error = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <h1>404</h1>
        <h2>Oops! Page not found.</h2>
        <p>We can't seem to find the page you're looking for.</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    </div>
  );
};

export default Error;
