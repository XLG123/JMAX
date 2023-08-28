import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { fetchProblems } from "../store/problems";

const SearchBar = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [dropdownItem, setDropdownItem] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProblems());
  }, [dispatch]);

  let allDropdownItems = [];
  allDropdownItems.push("Home Repair");
  allDropdownItems.push("Delivery");
  allDropdownItems.push("Driver");

  const allProblems = useSelector((state) => state.problems.all);
  const allKeys = Object.keys(allProblems);
  allKeys.forEach((key) => {
    if (!allDropdownItems.includes(allProblems[key].address)) {
      allDropdownItems.push(allProblems[key].address);
    }
  });

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
    setDropdownItem("");
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
        if (secondWord !== "") {
          caseInsensitive =
            firstWord[0].toUpperCase() +
            firstWord.substring(1).toLowerCase() +
            " " +
            secondWord[0].toUpperCase() +
            secondWord.substring(1).toLowerCase();
        } else {
          caseInsensitive = "placeholder";
        }
      } else if (wordCount > 2) {
        caseInsensitive = "placeholder";
      }
    }

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
    setDropdownItem("");
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
            onInput={(e) => setDropdownItem(e.target.value)}
            autoComplete="off"
          />
          <button className="search-bar-btn">
            <SearchIcon className="search-icon" sx={{ fontSize: "1.5vw" }} />
          </button>
        </form>
      </Tooltip>
      {dropdownItem &&
        (allDropdownItems.filter((option) =>
          option.toLowerCase().includes(dropdownItem.toLowerCase())
        ).length > 0 ? (
          <div className="search-dropdown-menu">
            <ul>
              {allDropdownItems
                .filter((option) =>
                  option.toLowerCase().includes(dropdownItem.toLowerCase())
                )
                .map((item, idx) => (
                  <li
                    className="dropdown-item"
                    key={idx}
                    onClick={(e) => {
                      dropdownSearch(item, e);
                    }}
                  >
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <></>
        ))}
    </div>
  );
};

export default SearchBar;
