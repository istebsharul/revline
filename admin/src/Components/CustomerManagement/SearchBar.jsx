import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce((term) => onSearch(term), 300), // Debounce input by 300ms
    [onSearch]
  );

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Search customers..."
      className="p-2 border rounded"
    />
  );
};

export default SearchBar;
