import React, { useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const Favorites = ({ favorites, setFavorites, pantry }) => {
  // Load favorites and deduplicate by idMeal
  useEffect(() => {
    async function fetchFavorites() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/favorites', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Deduplicate by idMeal
        const uniqueFavorites = Array.from(
          new Map(res.data.map(item => [item.idMeal, item])).values()
        );

        setFavorites(uniqueFavorites);
      } catch (error) {
        console.error('Failed to fetch favorites:', error.response?.data || error.message);
      }
    }

    fetchFavorites();
  }, [setFavorites]);

  // Remove favorite from backend and update state
  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/favorites/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedFavorites = favorites.filter(recipe => recipe.idMeal !== id);
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Failed to delete favorite:', error.response?.data || error.message);
    }
  };

  return (
    <div className="favorites-page">
      <div className="page-container">
        <h1>Your Favorite Recipes</h1>

        {favorites.length === 0 ? (
          <p>You haven't saved any favorite recipes yet.</p>
        ) : (
          <div className="favorites-list">
            {favorites.map(recipe => (
              <div key={recipe.idMeal} className="favorites-item">
                <RecipeCard recipe={recipe} pantry={pantry} />
                <button
                  onClick={() => handleRemove(recipe.idMeal)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;


// import React, { useEffect } from 'react';
// import RecipeCard from '../components/RecipeCard';
// import { getFavorites, deleteFavorite } from '../services/favoriteAPI';

// const Favorites = ({ favorites, setFavorites, pantry }) => {
//   // Load favorites and deduplicate by idMeal
//   useEffect(() => {
//     async function fetchFavorites() {
//       const data = await getFavorites();

//       // Deduplicate by idMeal
//       const uniqueFavorites = Array.from(
//         new Map(data.map(item => [item.idMeal, item])).values()
//       );

//       setFavorites(uniqueFavorites);
//     }
//     fetchFavorites();
//   }, [setFavorites]);

//   // Remove favorite from backend and update state
//   const handleRemove = async (id) => {
//     await deleteFavorite(id);
//     const updatedFavorites = favorites.filter(recipe => recipe.idMeal !== id);
//     setFavorites(updatedFavorites);
//   };

//   return (
//   <div className="favorites-page">
//     <div className="page-container">
//       <h1>Your Favorite Recipes</h1>

//       {favorites.length === 0 ? (
//         <p>You haven't saved any favorite recipes yet.</p>
//       ) : (
//         <div className="favorites-list">
//           {favorites.map(recipe => (
//             <div key={recipe.idMeal} className="favorites-item">
//               <RecipeCard recipe={recipe} pantry={pantry} />
//               <button
//                 onClick={() => handleRemove(recipe.idMeal)}
//                 className="remove-btn"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   </div>  
//   );
// };

// export default Favorites;