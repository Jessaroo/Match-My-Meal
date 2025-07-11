import React, { useState } from 'react';
import PantryManager from '../components/PantryManager';
import RecipeCard from '../components/RecipeCard';
import { searchRecipesByIngredients } from '../services/mealdbAPI';

const Home = () => {
  const [pantry, setPantry] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);  

  const handleSearch = async (ingredients) => {
    setPantry(ingredients);
    setLoading(true);           
    const results = await searchRecipesByIngredients(ingredients);
    setRecipes(results);
    setLoading(false);          
  };

  return (
  <div className="home-page">
    <div className="page-container">
      <section className="intro-section">
        <h2>Welcome to Match My Meal</h2>
        <p>
            Enter the ingredients you already have in your kitchen, and we'll help you find matching recipes!
            Just type ingredients like <em>chicken, rice, broccoli</em> and hit search. Save your favorites to access them later.
        </p>
      </section>

      <h1>Match My Meal</h1>

      <PantryManager
        setPantry={setPantry}
        onSearch={handleSearch}
      />

      <h2>Matching Recipes:</h2>
      <div className="recipe-list">
        {loading ? (
          <p>Searching recipes...</p>
        ) : recipes.length > 0 ? (
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
  </div>
  );
};

export default Home;