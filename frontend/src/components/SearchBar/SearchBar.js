import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";
import Tooltip from "@mui/material/Tooltip";

const SearchBar = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const wordCount = searchText.split(" ").length;
    let caseInsensitive = "";
    if (isNaN(parseInt(searchText[0]))) {
      if (wordCount === 1) {
        caseInsensitive =
          searchText[0].toUpperCase() + searchText.substring(1).toLowerCase();
      } else if (wordCount === 2) {
        const words = searchText.split(" ");
        const firstWord = words[0];
        const secondWord = words[1];
        caseInsensitive =
          firstWord[0].toUpperCase() +
          firstWord.substring(1).toLowerCase() +
          " " +
          secondWord[0].toUpperCase() +
          secondWord.substring(1).toLowerCase();
      }
    }
    // console.log(caseInsensitive);

    if (isNaN(parseInt(searchText[0]))) {
      fetch(`/api/problems/search/category/${caseInsensitive}`)
        .then((response) => response.json())
        .then((data) => {
          history.push("/search-results", { searchResults: data });
        });
    } else {
      fetch(`/api/problems/search/address/${searchText}`)
        .then((response) => response.json())
        .then((data) => {
          history.push("/search-results", { searchResults: data });
        });
    }
    setSearchText("");
  };

  return (
    <div className="search-bar-container">
      <Tooltip title="Search">
        <form
          className="search-bar-form"
          onSubmit={(e) => handleSearchSubmit(e)}
        >
          <input
            type="text"
            placeholder="Enter a zip code or a category name"
            id="search-bar"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="search-bar-btn">
            <SearchIcon className="search-icon" sx={{ fontSize: "1.5vw" }} />
          </button>
        </form>
      </Tooltip>
    </div>
  );
};

export default SearchBar;
