import React from 'react';
import { useState } from "react";
import search from "../Assets/search.svg"

const SearchBar = ({ onSearch }) => {
  const [name, filterSearch] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    filterSearch(value);
  }
  const handleSearch = () => {
    onSearch(name);
  }
  return (
    <div className="searchBar">
      <input
        type='text'
        placeholder='Search'
        value={name}
        onChange={handleChange}
        style={{ backgroundImage: `url(${search})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right center',
        paddingRight: '40px',
        fontSize: "14px",
        height: "26px",
        width: '350px' }}
      />
      
    </div>
  )
}

export default SearchBar