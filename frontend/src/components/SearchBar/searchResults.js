import React from "react";
import { useLocation } from "react-router-dom";
import "../Problems/ProblemBox";
import ProblemBox from "../Problems/ProblemBox";
import "./SearchBar.css";

const SearchResults = () => {
  const location = useLocation();
  const searchResults = location.state.searchResults;

  return (
    <div className="search-result">
      {Object.keys(searchResults).length === 0 ? (
        <div className="not-found-msg">
          Not Found, please enter another{" "}
          <span className="zipcode-search">zip code</span> or another{" "}
          <span className="category-search">category name</span>.
        </div>
      ) : (
        Object.values(searchResults).map((result, idx) => (
          <ProblemBox key={idx} problem={result} />
        ))
      )}
    </div>
  );
};

export default SearchResults;
