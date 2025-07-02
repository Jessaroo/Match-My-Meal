import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById } from '../services/mealdbAPI';

const RecipeDetail = ({ pantry = [] }) => {
  const { id } = useParams();       
  const navigate = useNavigate();   

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch full recipe details 
  useEffect(() => {
    async function fetchRecipe() {
      setLoading(true);
      const data = await getRecipeById(id);
      setRecipe(data);
      setLoading(false);
    }
    fetchRecipe();
  }, [id]);

  // Get all ingredients & measurements from the recipe object
  const getIngredients = (recipe) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient: ingredient.trim(), measure: measure ? measure.trim() : '' });
      }
    }
    return ingredients;
  };

  // Check if ingredient is in pantry
  const isInPantry = (ingredient) => {
    return pantry.some(p => p.toLowerCase() === ingredient.toLowerCase());
  };

  if (loading) return <p>Loading recipe...</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  const ingredients = getIngredients(recipe);

  return (
    <div className="recipe-detail">
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ maxWidth: '400px' }} />
      
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map(({ ingredient, measure }, idx) => (
          <li
            key={idx}
            style={{ color: isInPantry(ingredient) ? 'green' : 'red' }}
          >
            {measure} {ingredient}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p>{recipe.strInstructions}</p>
    </div>
  );
};

export default RecipeDetail;