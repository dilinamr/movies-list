  import React, { useState } from 'react';

  function SearchBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
      onSearch(searchQuery);
    };

    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    );
  }

  export default SearchBar;
