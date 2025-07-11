import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import { getFavorites } from './services/jsonServerAPI';
import Navbar from './components/Navbar';
import './styles/app.css';


function App() {
  const [favorites, setFavorites] = useState([]);
  const [pantry, setPantry] = useState([]);

  useEffect(() => {
    async function loadFavorites() {
      const data = await getFavorites();
      setFavorites(data);
    }
    loadFavorites();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <Home pantry={pantry} setPantry={setPantry} />
        } />
        <Route path="/recipe/:id" element={
          <RecipeDetail
            pantry={pantry}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        } />
        <Route path="/favorites" element={
          <Favorites
            favorites={favorites}
            setFavorites={setFavorites}
            pantry={pantry}
          />
        } />
      </Routes>
    </Router>
  );
}

export default App;