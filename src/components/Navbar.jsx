import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // 👈 Important
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>

      {isLoggedIn && (
        <>
          <Link to="/favorites" className="nav-link">Favorites</Link>
          <button className="nav-link" onClick={handleLogout} style={{ marginLeft: 'auto' }}>
            Logout
          </button>
        </>
      )}

      {!isLoggedIn && (
        <div style={{ marginLeft: 'auto' }}>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;