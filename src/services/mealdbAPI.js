// Fetch recipe details by ID
export async function getRecipeById(id) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

// Search recipes by ingredients array
export async function searchRecipesByIngredients(ingredientsArray) {
  // Convert array to comma-separated string
  const query = ingredientsArray.join(',');
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);
  const data = await res.json();
  return data.meals || [];
}