import { useState } from 'react';
import '../styles/SearchBar.scss';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="검색..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
