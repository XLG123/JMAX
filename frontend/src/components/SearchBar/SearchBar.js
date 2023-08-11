import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
// import { searchResults } from "./searchResults";
import "./SearchBar.css";

const SearchBar = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // console.log(parseInt(searchText[0]));
    if (isNaN(parseInt(searchText[0]))) {
      fetch(`/api/problems/search/category/${searchText}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          history.push("/search-results", { searchResults: data });
        });
    } else {
      fetch(`/api/problems/search/address/${searchText}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          history.push("/search-results", {searchResults: data });
        });
    }
    setSearchText("");
  };
  
  return (
    <div className="search-bar-container">
      <form className="search-bar-form" onSubmit={(e) => handleSearchSubmit(e)}>
        <input
          type="text"
          placeholder="Others might also share the same issues as you"
          id="search-bar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="search-bar-btn">
          <div type="submit"
            onClick={(e) => handleSearchSubmit(e)}
            onKeyDown={(e) => handleSearchSubmit(e)}>
            <SearchIcon className="search-icon" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;