import React, { useState, useEffect } from "react";
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
const BATCH_SIZE = 20;

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (loading) return;

      setLoading(true);

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

        if (currentPage === 1) {
          setMovies(moviesData);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...moviesData]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedCategory, sortBy, searchQuery, currentPage, loading]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortOption) => {
    setSortBy(newSortOption);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // User has scrolled to the bottom, load more movies
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="app">
      <h1 className="app-title">Movie Listing App</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="filter-sort">
        <Filter onCategoryChange={handleCategoryChange} />
        <Sort onSortChange={handleSortChange} />
      </div>
      <MovieList
        movies={movies.slice(0, currentPage * BATCH_SIZE)} // Display the first `currentPage * BATCH_SIZE` movies
        onMovieClick={handleMovieClick}
      />
      {isModalOpen && selectedMovie && (
        <MovieDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          movie={selectedMovie}
        />
      )}
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
}

export default App;
