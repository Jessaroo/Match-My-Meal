import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isRecipe = location.pathname.startsWith('/recipe');
  const isFavorites = location.pathname === '/favorites';

  return (
    <nav className="navbar">
      {isHome && (
        <Link to="/favorites" className="nav-link">Favorites</Link>
      )}
      {(isRecipe || isFavorites) && (
        <div className="nav-links-group">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;