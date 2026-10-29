
import "./SearchBar.css";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <label className="search-label" htmlFor="collection-search">
        Search albums
      </label>

      <input
        id="collection-search"
        type="search"
        placeholder="Search artist, album, or genre..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
