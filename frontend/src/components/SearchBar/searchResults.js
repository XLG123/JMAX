import React from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const searchResults = location.state.searchResults;
  return (
    <div>
      <h2 style={{ marginTop: "250px" }}>Search Results</h2>
      {Object.values(searchResults).map((result) => (
        <div className="search-result-box" key={result._id}>
          <div>{result.description}</div>
          <div>{result.category}</div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;