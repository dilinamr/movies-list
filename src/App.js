// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import './App.css';
// import MovieList from './components/MovieList';
// import SearchBar from './components/SearchBar';
// import Filter from './components/Filter';
// import Sort from './components/Sort';
// import MovieDetailsModal from './components/MovieDetailsModal'; // Updated component name

// const API_KEY = '1630c9c952a2eaa8626afbcef10fed4c';
// const DISCOVER_API_URL = 'https://api.themoviedb.org/3/discover/movie';
// const SEARCH_API_URL = 'https://api.themoviedb.org/3/search/movie';
// const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';
// const PAGE_SIZE = 20;

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [filteredMovies, setFilteredMovies] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortBy, setSortBy] = useState('popularity.desc');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const lastMovieRef = useRef(null);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       if (loading) return;

//       setLoading(true);

//       try {
//         let apiUrl = DISCOVER_API_URL;

//         if (searchQuery) {
//           apiUrl = SEARCH_API_URL;
//         }

//         const response = await axios.get(apiUrl, {
//           params: {
//             api_key: API_KEY,
//             sort_by: sortBy,
//             with_genres: selectedCategory === 'all' ? '' : selectedCategory,
//             query: searchQuery,
//             page: currentPage,
//           },
//         });

//         const moviesData = response.data.results;

//         if (searchQuery) {
//           setFilteredMovies((prevMovies) => [...prevMovies, ...moviesData]);
//         } else {
//           setMovies((prevMovies) => [...prevMovies, ...moviesData]);
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, [selectedCategory, sortBy, searchQuery, currentPage, loading]);

//   const handleMovieClick = (movie) => {
//     setSelectedMovie(movie);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleCategoryChange = (newCategory) => {
//     setSelectedCategory(newCategory);
//     setCurrentPage(1);
//     setMovies([]);
//     setFilteredMovies([]);
//   };

//   const handleSortChange = (newSortOption) => {
//     setSortBy(newSortOption);
//     setCurrentPage(1);
//     setMovies([]);
//     setFilteredMovies([]);
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setCurrentPage(1);
//     setMovies([]);
//     setFilteredMovies([]);
//   };

//   const handleIntersection = (entries) => {
//     if (entries[0].isIntersecting && !loading) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   useEffect(() => {
//     if (lastMovieRef.current) {
//       const observer = new IntersectionObserver(handleIntersection, {
//         root: null,
//         rootMargin: '0px',
//         threshold: 1.0,
//       });
//       observer.observe(lastMovieRef.current);

//       return () => {
//         observer.unobserve(lastMovieRef.current);
//       };
//     }
//   }, [lastMovieRef]);

//   return (
//     <div className="app">
//       <h1 className="app-title">Movie Listing App</h1>
//       <SearchBar onSearch={handleSearch} />
//       <div className="filter-sort">
//         <Filter onCategoryChange={handleCategoryChange} />
//         <Sort onSortChange={handleSortChange} />
//       </div>
//       <MovieList
//         movies={searchQuery ? filteredMovies : movies}
//         onMovieClick={handleMovieClick}
//         lastMovieRef={lastMovieRef}
//       />
//       {isModalOpen && selectedMovie && (
//         <MovieDetailsModal // Updated component name
//           isOpen={isModalOpen}
//           onClose={handleCloseModal}
//           movie={selectedMovie}
//         />
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import MovieDetailsModal from "./components/MovieDetailsModal";

const API_KEY = "1630c9c952a2eaa8626afbcef10fed4c";
const DISCOVER_API_URL = "https://api.themoviedb.org/3/discover/movie";
const SEARCH_API_URL = "https://api.themoviedb.org/3/search/movie";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PAGE_SIZE = 20;

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lastMovieRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let apiUrl = DISCOVER_API_URL;

        if (searchQuery) {
          apiUrl = SEARCH_API_URL;
        }

        const response = await axios.get(apiUrl, {
          params: {
            api_key: API_KEY,
            sort_by: sortBy,
            with_genres: selectedCategory === "all" ? "" : selectedCategory,
            query: searchQuery,
            page: currentPage,
          },
        });

        const moviesData = response.data.results;

        if (searchQuery) {
          setFilteredMovies((prevMovies) => [...prevMovies, ...moviesData]);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...moviesData]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, [selectedCategory, sortBy, searchQuery, currentPage]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setCurrentPage(1);
    setMovies([]);
    setFilteredMovies([]);
  };

  const handleSortChange = (newSortOption) => {
    setSortBy(newSortOption);
    setCurrentPage(1);
    setMovies([]);
    setFilteredMovies([]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setMovies([]);
    setFilteredMovies([]);
  };

  const handleIntersection = (entries) => {
    if (entries[0].isIntersecting) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (lastMovieRef.current) {
      const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      });
      observer.observe(lastMovieRef.current);

      return () => {
        observer.unobserve(lastMovieRef.current);
      };
    }
  }, [lastMovieRef]);

  return (
    <div className="app">
      <h1 className="app-title">Movie Listing App</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="filter-sort">
        <Filter onCategoryChange={handleCategoryChange} />
        <Sort onSortChange={handleSortChange} />
      </div>
      <MovieList
        movies={searchQuery ? filteredMovies : movies}
        onMovieClick={handleMovieClick}
        lastMovieRef={lastMovieRef}
      />
      {isModalOpen && selectedMovie && (
        <MovieDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          movie={selectedMovie}
        />
      )}
    </div>
  );
}

export default App;
