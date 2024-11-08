import React, { useState, useEffect } from 'react';

const SearchDropdown = ({ data, onSelect }) => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (search.length > 0) {
      const results = data.filter(item =>
        item.titre.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(results);
    } else {
      setFilteredData([]);
    }
  }, [search, data]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSelect = (item) => {
    onSelect(item);
    setSearch('');
    setFilteredData([]);
  };

  return (
    <div className="search-dropdown-container">
      <input
        type="search"
        placeholder="Chercher un livre"
        value={search}
        onChange={handleChange}
        className="search-bar"
      />
      {filteredData.length > 0 && (
        <ul className="dropdown-list">
          {filteredData.map((item) => (
            <li key={item.id} onClick={() => handleSelect(item)}>
              {item.titre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
