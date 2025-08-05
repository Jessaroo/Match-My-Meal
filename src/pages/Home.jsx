import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import PantryManager from '../components/PantryManager';
import RecipeCard from '../components/RecipeCard';
import { searchRecipesByIngredients } from '../services/mealdbAPI';

console.log('TOKEN:', localStorage.getItem('token'));

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

          {/*Show login/register if user is not logged in */}
          {!localStorage.getItem('token') && (
            <p>
              <strong>New here?</strong>{' '}
              <Link to="/register">Create an account</Link> or{' '}
              <Link to="/login">log in</Link> to start saving your favorite meals!
            </p>
          )}
        </section>

        {/* Begin new section with side images */}
        <div className="section-with-images">
          <img
            src="/images/left-image.jpg"
            alt="Left decoration"
            className="side-image"
          />

          <div className="content">
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

          <img
            src="/images/right-image.jpg"
            alt="Right decoration"
            className="side-image"
          />
        </div>
        {/* End new section */}
      </div>
    </div>
  );
};

export default Home;



// import React, { useState } from 'react';
// import PantryManager from '../components/PantryManager';
// import RecipeCard from '../components/RecipeCard';
// import { searchRecipesByIngredients } from '../services/mealdbAPI';

// const Home = () => {
//   const [pantry, setPantry] = useState([]);
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async (ingredients) => {
//     setPantry(ingredients);
//     setLoading(true);
//     const results = await searchRecipesByIngredients(ingredients);
//     setRecipes(results);
//     setLoading(false);
//   };

//   return (
//     <div className="home-page">
//       <div className="page-container">
//         <section className="intro-section">
//           <h2>Welcome to Match My Meal</h2>
//           <p>
//             Enter the ingredients you already have in your kitchen, and we'll help you find matching recipes!
//             Just type ingredients like <em>chicken, rice, broccoli</em> and hit search. Save your favorites to access them later.
//           </p>
//         </section>

//         {/* Begin new section with side images */}
//         <div className="section-with-images">
//           <img
//             src="/images/left-image.jpg"
//             alt="Left decoration"
//             className="side-image"
//           />

//           <div className="content">
//             <h1>Match My Meal</h1>

//             <PantryManager
//               setPantry={setPantry}
//               onSearch={handleSearch}
//             />

//             <h2>Matching Recipes:</h2>
//             <div className="recipe-list">
//               {loading ? (
//                 <p>Searching recipes...</p>
//               ) : recipes.length > 0 ? (
//                 recipes.map(recipe => (
//                   <RecipeCard
//                     key={recipe.idMeal}
//                     recipe={recipe}
//                     pantry={pantry}
//                   />
//                 ))
//               ) : (
//                 <p>No recipes to display. Try searching!</p>
//               )}
//             </div>
//           </div>

//           <img
//             src="/images/right-image.jpg"
//             alt="Right decoration"
//             className="side-image"
//           />
//         </div>
//         {/* End new section */}
//       </div>
//     </div>
//   );
// };

// export default Home;