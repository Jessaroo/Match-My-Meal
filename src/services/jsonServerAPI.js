const API_URL = 'http://localhost:3001';

// Pantry Function
export async function getPantry() {
  const res = await fetch(`${API_URL}/pantry`);
  return res.json();
}

export async function addPantryItem(item) {
  const res = await fetch(`${API_URL}/pantry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return res.json();
}

export async function deletePantryItem(id) {
  await fetch(`${API_URL}/pantry/${id}`, { method: 'DELETE' });
}


// Favorites Function
export async function getFavorites() {
  const res = await fetch(`${API_URL}/favorites`);
  return res.json();
}

export async function addFavorite(recipe) {
  const res = await fetch(`${API_URL}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe)
  });
  return res.json();
}

export async function deleteFavorite(id) {
  await fetch(`${API_URL}/favorites/${id}`, { method: 'DELETE' });
}