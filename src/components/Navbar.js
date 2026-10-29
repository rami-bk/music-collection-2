
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <h1 className="navbar-title">Music Collection</h1>

      <button
        type="button"
        className="menu-toggle"
        onClick={() => setIsMenuOpen((previous) => !previous)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>

      <div
        id="primary-navigation"
        className={isMenuOpen ? "nav-links open" : "nav-links"}
      >
        <NavLink to="/add" onClick={closeMenu}>
          Add Album
        </NavLink>

        <NavLink to="/albums" onClick={closeMenu}>
          Albums
        </NavLink>

        <NavLink to="/artists" onClick={closeMenu}>
          Artists
        </NavLink>

        <NavLink to="/favorite-albums" onClick={closeMenu}>
          Favorite Albums
        </NavLink>

        <NavLink to="/favorite-artists" onClick={closeMenu}>
          Favorite Artists
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
