import React from "react";

function MovieDetails({ movie, posterBaseUrl, onClose }) {
  return (
    <div className="movie-details-overlay">
      <div className="movie-details">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>{movie.title}</h2>
        <img
          src={`${posterBaseUrl}${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Vote Average: {movie.vote_average}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
