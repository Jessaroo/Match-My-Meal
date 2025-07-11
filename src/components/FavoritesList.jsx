import React from 'react';
import RecipeCard from './RecipeCard';
import { deleteFavorite } from '../services/jsonServerAPI';

const FavoritesList = ({ favorites, setFavorites, pantry }) => {
  const handleRemove = async (idMeal) => {
    try {
      await deleteFavorite(idMeal);
      const updated = favorites.filter(recipe => recipe.idMeal !== idMeal);
      setFavorites(updated);
    } catch (error) {
      console.error('Failed to delete favorite:', error);
    }
  };

  return (
    <div className="favorites-list">
      {favorites.length === 0 ? (
        <p>You haven't saved any favorites yet.</p>
      ) : (
        favorites.map(recipe => (
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
                cursor: 'pointer',
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;