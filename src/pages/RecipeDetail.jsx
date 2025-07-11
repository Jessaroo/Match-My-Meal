import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById } from '../services/mealdbAPI';
import { addFavorite, deleteFavorite } from '../services/jsonServerAPI';

const RecipeDetail = ({ pantry = [], favorites = [], setFavorites }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      setLoading(true);
      const data = await getRecipeById(id);
      setRecipe(data);
      setLoading(false);
    }
    fetchRecipe();
  }, [id]);

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

  const isInPantry = (ingredient) =>
    pantry.some((p) => p.toLowerCase() === ingredient.toLowerCase());

  const isFavorite = favorites.some((fav) => fav.idMeal === recipe?.idMeal);

  const handleAddFavorite = async () => {
    try {
      const added = await addFavorite(recipe);
      setFavorites((prev) => [...prev, added]);
    } catch (err) {
      console.error('Error adding favorite:', err);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      await deleteFavorite(recipe.idMeal);
      setFavorites((prev) => prev.filter((fav) => fav.idMeal !== recipe.idMeal));
    } catch (err) {
      console.error('Error removing favorite:', err);
    }
  };

  if (loading) return <p>Loading recipe...</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  const ingredients = getIngredients(recipe);

  return (
    <div className="recipe-detail-container">
      <div className="recipe-detail">
        <button onClick={() => navigate(-1)}>← Back</button>

        {/* Grouped section */}
        <div className="recipe-header">
          <h1>{recipe.strMeal}</h1>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="recipe-image"
          />
          {isFavorite ? (
            <button onClick={handleRemoveFavorite} className="favorite-btn remove">
              Remove from Favorites
            </button>
          ) : (
            <button onClick={handleAddFavorite} className="favorite-btn add">
              Add to Favorites
            </button>
          )}
        </div>

        <h2>Ingredients</h2>
        <ul>
          {ingredients.map(({ ingredient, measure }, idx) => (
            <li key={idx} style={{ color: isInPantry(ingredient) ? 'green' : 'red' }}>
              {measure} {ingredient}
            </li>
          ))}
        </ul>

        <h2>Instructions</h2>
        <p>{recipe.strInstructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;