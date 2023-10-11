import React from "react";

function MovieDetailsModal({ isOpen, onClose, movie }) {
  const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500"; // Add this line

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>{movie.title}</h2>
        <img
          className="modalimg"
          src={POSTER_BASE_URL + movie.poster_path}
          alt={movie.title}
        />
        <h2>overview</h2>
        <p>{movie.overview}</p>

        {/* Additional movie details */}
        <div className="movie-details">
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
          {movie.genres && movie.genres.length > 0 && (
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          )}
          <p>
            <strong>Popularity:</strong> {movie.popularity}
          </p>

          {/* Add more movie details as needed */}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsModal;
