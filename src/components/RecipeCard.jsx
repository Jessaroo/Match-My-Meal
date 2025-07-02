import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <h3>{recipe.strMeal}</h3>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} width="200" />
      <br />
      <Link to={`/recipe/${recipe.idMeal}`}>View Recipe</Link>
    </div>
  );
};

export default RecipeCard;