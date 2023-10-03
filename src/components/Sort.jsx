import React, { useState } from 'react';

const sortingOptions = [
  { id: 'popularity.desc', label: 'Popularity Descending' },
  { id: 'popularity.asc', label: 'Popularity Ascending' },
  { id: 'vote_average.desc', label: 'Rating Descending' },
  { id: 'vote_average.asc', label: 'Rating Ascending' },
];

function Sort({ onSortChange }) {
  const [selectedSortOption, setSelectedSortOption] = useState('popularity.desc');

  const handleSortChange = (event) => {
    const newSortOption = event.target.value;
    setSelectedSortOption(newSortOption);
    onSortChange(newSortOption);
  };

  return (
    <div className="sort">
      <label htmlFor="sort">Sort by:</label>
      <select
        id="sort"
        value={selectedSortOption}
        onChange={handleSortChange}
      >
        {sortingOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Sort;
