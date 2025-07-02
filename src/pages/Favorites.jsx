import React, { useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { getFavorites, deleteFavorite } from '../services/jsonServerAPI';

const Favorites = ({ favorites, setFavorites, pantry }) => {

  // Load favorites 
  useEffect(() => {
    async function fetchFavorites() {
      const data = await getFavorites();
      setFavorites(data);
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
      <h1>Your Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <p>You haven't saved any favorite recipes yet.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map(recipe => (
            <div key={recipe.idMeal} style={{ position: 'relative' }}>
              <RecipeCard recipe={recipe} pantry={pantry} />
              <button
                onClick={() => handleRemove(recipe.idMeal)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;