import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";
import Tooltip from "@mui/material/Tooltip";

const SearchBar = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");

  const dropdownSearch = (dropdownItem, e) => {
    e.preventDefault();
    if (isNaN(parseInt(dropdownItem[0]))) {
      fetch(`/api/problems/search/category/${dropdownItem}`)
        .then((response) => response.json())
        .then((data) => {
          history.push("/search-results", { searchResults: data });
        });
    } else {
      fetch(`/api/problems/search/address/${dropdownItem}`)
        .then((response) => response.json())
        .then((data) => {
          history.push("/search-results", { searchResults: data });
        });
    }
    setSearchText("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const wordCount = searchText.split(" ").length;
    let caseInsensitive = "";
    if (isNaN(parseInt(searchText[0]))) {
      if (searchText === "") {
        caseInsensitive = "placeholder";
      } else if (wordCount === 1) {
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

    if (caseInsensitive === "Repair Home") {
      caseInsensitive = "Home Repair";
    }

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
        <form className="search-bar-form" onSubmit={(e) => handleSearch(e)}>
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
      {searchText && (
        <div className="search-dropdown-menu">
          <ul>
            {isNaN(parseInt(searchText[0])) ? (
              searchText[0].toLowerCase() === "h" ? (
                <li
                  className="dropdown-item"
                  onClick={(e) => dropdownSearch("Home Repair", e)}
                >
                  Home Repair
                </li>
              ) : searchText[0].toLowerCase() === "d" ? (
                <>
                  <li
                    className="dropdown-item"
                    onClick={(e) => dropdownSearch("Delivery", e)}
                  >
                    Delivery
                  </li>
                  <li
                    className="dropdown-item"
                    onClick={(e) => dropdownSearch("Driver", e)}
                  >
                    Driver
                  </li>
                </>
              ) : (
                <></>
              )
            ) : searchText[0] === "1" ? (
              <>
                {searchText[1] === "0" ? (
                  <li
                    className="dropdown-item"
                    onClick={(e) => dropdownSearch("10312", e)}
                  >
                    10312
                  </li>
                ) : (
                  <></>
                )}
                {searchText[1] === "1" ? (
                  <>
                    <li
                      className="dropdown-item"
                      onClick={(e) => dropdownSearch("11212", e)}
                    >
                      11212
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={(e) => dropdownSearch("11420", e)}
                    >
                      11420
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={(e) => dropdownSearch("11421", e)}
                    >
                      11421
                    </li>
                  </>
                ) : (
                  <></>
                )}
                {searchText[1] === "2" ? (
                  <>
                    <li
                      className="dropdown-item"
                      onClick={(e) => dropdownSearch("12123", e)}
                    >
                      12123
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={(e) => dropdownSearch("12312", e)}
                    >
                      12312
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={(e) => dropdownSearch("12323", e)}
                    >
                      12323
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={(e) => dropdownSearch("12345", e)}
                    >
                      12345
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <li className="dropdown-item"></li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
