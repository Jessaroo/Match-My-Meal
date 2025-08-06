import axios from 'axios';

const API_URL = 'https://match-my-meal-backend.onrender.com/api/favorites';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const getFavorites = async () => {
  const res = await axios.get(API_URL, getAuthHeader());
  return res.data;
};

export const addFavorite = async (recipe) => {
  const res = await axios.post(API_URL, recipe, getAuthHeader());
  return res.data;
};

export const deleteFavorite = async (idMeal) => {
  await axios.delete(`${API_URL}/${idMeal}`, getAuthHeader());
};