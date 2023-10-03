
// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import './App.css';
// import MovieList from './components/MovieList';
// import SearchBar from './components/SearchBar';
// import Filter from './components/Filter';
// import Sort from './components/Sort';
// import Pagination from './components/Pagination';
// import MovieDetails from './components/MovieDetails';

// const API_KEY = '1630c9c952a2eaa8626afbcef10fed4c';
// const API_URL = 'https://api.themoviedb.org/3/discover/movie';
// const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [filteredMovies, setFilteredMovies] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortBy, setSortBy] = useState('popularity.desc');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedMovie, setSelectedMovie] = useState(null);

//   // Ref for the last movie element
//   const lastMovieRef = useRef(null);

//   // Fetch movies from TMDB API
//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get(API_URL, {
//           params: {
//             api_key: API_KEY,
//             sort_by: sortBy,
//             with_genres: selectedCategory === 'all' ? '' : selectedCategory,
//             query: searchQuery,
//             page: currentPage,
//           },
//         });
//         const moviesData = response.data.results;
//         setMovies((prevMovies) => [...prevMovies, ...moviesData]);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchMovies();
//   }, [selectedCategory, sortBy, searchQuery, currentPage]);

//   // Handle movie tile click to show details
//   const handleMovieClick = (movie) => {
//     setSelectedMovie(movie);
//   };

//   // Handle close details pop-up
//   const handleCloseDetails = () => {
//     setSelectedMovie(null);
//   };

//   // Handle category filter change
//   const handleCategoryChange = (newCategory) => {
//     setSelectedCategory(newCategory);
//     setCurrentPage(1); // Reset page when category changes
//     setMovies([]); // Clear existing movies
//   };

//   // Handle sorting change
//   const handleSortChange = (newSortOption) => {
//     setSortBy(newSortOption);
//     setCurrentPage(1); // Reset page when sorting changes
//     setMovies([]); // Clear existing movies
//   };

//   // Handle search
//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setCurrentPage(1); // Reset page when searching
//     setMovies([]); // Clear existing movies
//   };

//   // Intersection Observer callback for infinite scrolling
//   const observerCallback = (entries) => {
//     if (entries[0].isIntersecting && currentPage < totalPages) {
//       // If the last movie element is intersecting the viewport and there are more pages to load
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Create an Intersection Observer
//   const observer = new IntersectionObserver(observerCallback, {
//     root: null, // Use the viewport as the root
//     rootMargin: '0px', // No margin
//     threshold: 1.0, // Fully visible
//   });

//   // Observe the last movie element
//   useEffect(() => {
//     if (lastMovieRef.current) {
//       observer.observe(lastMovieRef.current);
//     }

//     // Cleanup when component unmounts
//     return () => {
//       if (lastMovieRef.current) {
//         observer.unobserve(lastMovieRef.current);
//       }
//     };
//   }, [currentPage]);

//   // Calculate the movies to display on the current page
//   const moviesPerPage = 16;
//   const indexOfLastMovie = currentPage * moviesPerPage;
//   const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
//   const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
//   const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  
//   return (
//     <div className="app">
//       <h1 className="app-title">Movie Listing App</h1>
//       <SearchBar onSearch={handleSearch} />
//       <div className="filter-sort">
//         <Filter onCategoryChange={handleCategoryChange} />
//         <Sort onSortChange={handleSortChange} />
//       </div>
//       <MovieList
//         movies={currentMovies}
//         onMovieClick={handleMovieClick}
//         lastMovieRef={lastMovieRef} // Pass the ref to the MovieList component
//       />
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         setCurrentPage={setCurrentPage}
//       />
//       {selectedMovie && (
//         <MovieDetails
//           movie={selectedMovie}
//           posterBaseUrl={POSTER_BASE_URL}
//           onClose={handleCloseDetails}
//         />
//       )}
//     </div>
//   );
// }

// export default App;





import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import Sort from './components/Sort';
import Pagination from './components/Pagination';
import MovieDetails from './components/MovieDetails';

const API_KEY = '1630c9c952a2eaa8626afbcef10fed4c';
const API_URL = 'https://api.themoviedb.org/3/discover/movie';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Ref for the last movie element
  const lastMovieRef = useRef(null);

  // Fetch movies from TMDB API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            api_key: API_KEY,
            sort_by: sortBy,
            with_genres: selectedCategory === 'all' ? '' : selectedCategory,
            query: searchQuery,
            page: currentPage,
          },
        });
        const moviesData = response.data.results;
        setMovies((prevMovies) => [...prevMovies, ...moviesData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, [selectedCategory, sortBy, searchQuery, currentPage]);

  // Handle movie tile click to show details
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  // Handle close details pop-up
  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  // Handle category filter change
  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setCurrentPage(1); // Reset page when category changes
    setMovies([]); // Clear existing movies
  };

  // Handle sorting change
  const handleSortChange = (newSortOption) => {
    setSortBy(newSortOption);
    setCurrentPage(1); // Reset page when sorting changes
    setMovies([]); // Clear existing movies
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset page when searching
    setMovies([]); // Clear existing movies
  };

  // Intersection Observer callback for infinite scrolling
  const observerCallback = (entries) => {
    if (entries[0].isIntersecting && currentPage < totalPages) {
      // If the last movie element is intersecting the viewport and there are more pages to load
      setCurrentPage(currentPage + 1);
    }
  };

  // Create an Intersection Observer
  const observer = new IntersectionObserver(observerCallback, {
    root: null, // Use the viewport as the root
    rootMargin: '0px', // No margin
    threshold: 1.0, // Fully visible
  });

  // Observe the last movie element
  useEffect(() => {
    if (lastMovieRef.current) {
      observer.observe(lastMovieRef.current);
    }

    // Cleanup when component unmounts
    return () => {
      if (lastMovieRef.current) {
        observer.unobserve(lastMovieRef.current);
      }
    };
  }, [currentPage]);

  // Calculate the movies to display on the current page
  const moviesPerPage = 16;
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  return (
    <div className="app">
      <h1 className="app-title">Movie Listing App</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="filter-sort">
        <Filter onCategoryChange={handleCategoryChange} />
        <Sort onSortChange={handleSortChange} />
      </div>
      <MovieList
        movies={currentMovies}
        onMovieClick={handleMovieClick}
        lastMovieRef={lastMovieRef} // Pass the ref to the MovieList component
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          posterBaseUrl={POSTER_BASE_URL}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
}

export default App;
