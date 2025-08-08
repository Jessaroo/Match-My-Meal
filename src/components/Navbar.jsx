import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // removed useLocation

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-link">Home</Link>
        {isLoggedIn && (
          <Link to="/favorites" className="nav-link">Favorites</Link>
        )}
      </div>

      <div className="nav-right">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-left">
//         <Link to="/" className="nav-link">Home</Link>
//         {isLoggedIn && (
//           <Link to="/favorites" className="nav-link">Favorites</Link>
//         )}
//       </div>

//       <div className="nav-right">
//         {!isLoggedIn ? (
//           <>
//             <Link to="/login" className="nav-link">Login</Link>
//             <Link to="/register" className="nav-link">Register</Link>
//           </>
//         ) : (
//           <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false); // 👈 Important
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar">
//       <Link to="/" className="nav-link">Home</Link>

//       {isLoggedIn && (
//         <>
//           <Link to="/favorites" className="nav-link">Favorites</Link>
//           <button className="nav-link" onClick={handleLogout} style={{ marginLeft: 'auto' }}>
//             Logout
//           </button>
//         </>
//       )}

//       {!isLoggedIn && (
//         <div style={{ marginLeft: 'auto' }}>
//           <Link to="/login" className="nav-link">Login</Link>
//           <Link to="/register" className="nav-link">Register</Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;