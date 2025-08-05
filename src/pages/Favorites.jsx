import React, { useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { getFavorites, deleteFavorite } from '../services/favoriteAPI';

const Favorites = ({ favorites, setFavorites, pantry }) => {
  // Load favorites and deduplicate by idMeal
  useEffect(() => {
    async function fetchFavorites() {
      const data = await getFavorites();

      // Deduplicate by idMeal
      const uniqueFavorites = Array.from(
        new Map(data.map(item => [item.idMeal, item])).values()
      );

      setFavorites(uniqueFavorites);
    }
    fetchFavorites();
  }, [setFavorites]);

  // Remove favorite from backend and update state
  const handleRemove = async (id) => {
    await deleteFavorite(id);
    const updatedFavorites = favorites.filter(recipe => recipe.idMeal !== id);
    setFavorites(updatedFavorites);
  };

  return (
  <div className="favorites-page">
    <div className="page-container">
      <h1>Your Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <p>You haven't saved any favorite recipes yet.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map(recipe => (
            <div key={recipe.idMeal} className="favorites-item">
              <RecipeCard recipe={recipe} pantry={pantry} />
              <button
                onClick={() => handleRemove(recipe.idMeal)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>  
  );
};

export default Favorites;