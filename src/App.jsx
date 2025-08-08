import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { getFavorites } from './services/favoriteAPI';
import './styles/app.css';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [pantry, setPantry] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('token') 
  );

  // Ensure isLoggedIn syncs with localStorage on refresh
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Load favorites when logged in
  useEffect(() => {
    async function loadFavorites() {
      if (isLoggedIn) {
        const data = await getFavorites();
        setFavorites(data);
      }
    }
    loadFavorites();
  }, [isLoggedIn]);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={<Home pantry={pantry} setPantry={setPantry} />}
        />
        <Route
          path="/recipe/:id"
          element={
            <RecipeDetail
              pantry={pantry}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites
                favorites={favorites}
                setFavorites={setFavorites}
                pantry={pantry}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </Router>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import RecipeDetail from './pages/RecipeDetail';
// import Favorites from './pages/Favorites';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Navbar from './components/Navbar';
// import { getFavorites } from './services/favoriteAPI';
// import './styles/app.css';
// import PrivateRoute from './components/PrivateRoute';

// function App() {
//   const [favorites, setFavorites] = useState([]);
//   const [pantry, setPantry] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     !!localStorage.getItem('token') 
//   );

//   useEffect(() => {
//     async function loadFavorites() {
//       if (isLoggedIn) {
//         const data = await getFavorites();
//         setFavorites(data);
//       }
//     }
//     loadFavorites();
//   }, [isLoggedIn]);

//   return (
//     <Router>
//       <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//       <Routes>
//         <Route path="/" element={
//           <Home pantry={pantry} setPantry={setPantry} />
//         } />
//         <Route path="/recipe/:id" element={
//           <RecipeDetail
//             pantry={pantry}
//             favorites={favorites}
//             setFavorites={setFavorites}
//           />
//         } />
//         <Route path="/favorites" element={
//           <PrivateRoute>
//             <Favorites
//               favorites={favorites}
//               setFavorites={setFavorites}
//               pantry={pantry}
//             />
//           </PrivateRoute>
//         } />
//         <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;