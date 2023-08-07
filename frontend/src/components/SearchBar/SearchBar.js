import SearchIcon from '@mui/icons-material/Search';
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <form className="search-bar-form">
        <input type="text" 
          placeholder="Others also share the same issues as you" 
          className="search-bar"/>
          
        <div className="search-bar-btn">
          <SearchIcon />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;