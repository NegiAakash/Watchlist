import React from "react";
import Popup from "reactjs-popup";

import "./MovieDetailPopup.css";

const MoviePopup = ({ isPopupVisible, setIsPopupVisible, movie }) => {
  return (
    <Popup
      open={isPopupVisible}
      position="right center"
      onClose={() => setIsPopupVisible(false)}
    >
      <div
        id="popup-wrapper"
        style={{ backgroundImage: `url(${movie.Poster})` }}
      >
        <div className="popup-content">
          <h2>
            {movie.Title} ({movie.Year})
          </h2>
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <p>
            <strong>Rating:</strong> {movie.imdbRating} / 10
          </p>
          <p>
            <strong>Votes:</strong> {movie.imdbVotes}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.Runtime}
          </p>
          <p>
            <strong>Released:</strong> {movie.Released}
          </p>
        </div>
      </div>
    </Popup>
  );
};

export default MoviePopup;
