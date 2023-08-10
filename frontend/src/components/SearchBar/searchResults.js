import React from "react";
import { useLocation } from "react-router-dom";
import '../Problems/ProblemBox';
import ProblemBox from "../Problems/ProblemBox";
import "./SearchBar.css";

const SearchResults = () => {
  const location = useLocation();
  const searchResults = location.state.searchResults;

  return (
    <div className="search-result">

      {Object.values(searchResults).map((result) => (
          <ProblemBox problem={result}/>
      ))}
    </div>
  );
};

export default SearchResults;