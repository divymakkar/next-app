import React from "react";

function SearchBar() {
  return (
    <div className="search-bar-container">
      <input
        className="search-bar-input"
        type="search"
        placeholder="Search Destinations, Tours, Activities"
      />
      <div className="search-bar-logo">
        <img src="/icons/search.svg" alt=">" />
      </div>
    </div>
  );
}

export default SearchBar;
