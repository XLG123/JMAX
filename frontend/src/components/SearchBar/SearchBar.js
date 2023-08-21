import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";
import Tooltip from '@mui/material/Tooltip';

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
          // console.log(data);
          history.push("/search-results", { searchResults: data });
        });
    } else {
      fetch(`/api/problems/search/address/${searchText}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          history.push("/search-results", {searchResults: data });
        });
    }
    setSearchText("");
  };
  
  return (
    <div className="search-bar-container">
      <Tooltip title="Search">
        <form className="search-bar-form" 
          onSubmit={(e) => handleSearchSubmit(e)}>
          <input
            type="text"
            placeholder="Enter a zip code or a category name"
            id="search-bar"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="search-bar-btn">
            <SearchIcon className="search-icon" sx={{fontSize: "1.5vw"}}/>
          </button>
        </form>
      </Tooltip>
    </div>
  );
};

export default SearchBar;