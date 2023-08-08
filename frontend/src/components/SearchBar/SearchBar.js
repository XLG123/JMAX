import SearchIcon from '@mui/icons-material/Search';
import "./SearchBar.css";

const SearchBar = () => {

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // e.stopPropagation();
  }

  return (
    <div className="search-bar-container">
      <form className="search-bar-form" onClick={(e) => handleSearchSubmit(e)}>
        <input type="text" 
          placeholder="Others might also share the same issues as you" 
          id="search-bar"/>
          
        <div className="search-bar-btn" onClick={(e) => handleSearchSubmit(e)}>
          <SearchIcon className='search-icon'/>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;