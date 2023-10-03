

import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ movies, onMovieClick, searchQuery }) {
  return (
    <div className="movie-list">
      {searchQuery === '' ? (
        // Render movies based on category, sorting, etc.
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
        ))
      ) : (
        // Render movies based on search results
        movies.length === 0 ? (
          <p>No results found for "{searchQuery}"</p>
        ) : (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
          ))
        )
      )}
    </div>
  );
}

export default MovieList;


