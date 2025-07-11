// Fetch recipe details by ID
export async function getRecipeById(id) {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching recipe by ID:', id, error);
    return null;
  }
}

// Multi-ingredient search: fetch for each ingredient, collect unique recipes,
// fetch details, then filter/sort by number of matching ingredients.
export async function searchRecipesByIngredients(pantry) {
  const foundMealIds = new Set();

  // Fetch meals for each ingredient individually
  await Promise.all(pantry.map(async (ingredient) => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await res.json();
      if (data.meals) {
        data.meals.forEach(meal => foundMealIds.add(meal.idMeal));
      }
    } catch (error) {
      console.error(`Error fetching meals for ingredient "${ingredient}":`, error);
    }
  }));

  const detailedResults = [];

  // Fetch full details for each unique meal ID
  for (const id of foundMealIds) {
    const meal = await getRecipeById(id);
    if (!meal) continue;

    // Extract all ingredients from the meal
    const recipeIngredients = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      if (ing && ing.trim()) {
        recipeIngredients.push(ing.trim().toLowerCase());
      }
    }

    // Count how many pantry ingredients match recipe ingredients
    const matchCount = recipeIngredients.filter(ing => pantry.includes(ing)).length;

    // Only include recipes with at least 1 matching ingredient (or change this threshold)
    if (matchCount > 0) {
      meal._matchCount = matchCount;
      detailedResults.push(meal);
    }
  }

  // Sort recipes by most matching ingredients first
  detailedResults.sort((a, b) => b._matchCount - a._matchCount);

  return detailedResults;
}