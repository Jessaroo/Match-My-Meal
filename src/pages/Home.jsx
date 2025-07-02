import React, { useState } from 'react';
import PantryManager from '../components/PantryManager';
import RecipeCard from '../components/RecipeCard';
import { searchRecipesByIngredients } from '../services/mealdbAPI';

// Component set up.
const Home = () => {
  // State to hold pantry ingredients entered by user
  const [pantry, setPantry] = useState([]);
  // State to hold list of recipes fetched from API
  const [recipes, setRecipes] = useState([]);

  // Recipe search: function to fetch recipes 
  const handleSearch = async () => {
    const results = await searchRecipesByIngredients(pantry);
    setRecipes(results);
  };

  // Render the UI.
  return (
    <div className="home-page">
      <h1>Match My Meal</h1>

      {/* Pantry manager logic */}
      <PantryManager 
        pantry={pantry} 
        setPantry={setPantry} 
        onSearch={handleSearch} 
      />

      {/* The recipe results */}
      <h2>Matching Recipes:</h2>
      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <RecipeCard 
              key={recipe.idMeal} 
              recipe={recipe} 
              pantry={pantry} 
            />
          ))
        ) : (
          <p>No recipes to display. Try searching!</p>
        )}
      </div>
    </div>
  );
};

export default Home;