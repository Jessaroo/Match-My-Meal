import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';

import './styles/app.css';

const App = () => {
  // Declare your state here
  const [pantry, setPantry] = useState([]);
  const [favorites, setFavorites] = useState([]);

  return (
    <Router>
      <div className="app">
        <nav>
          <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<Home pantry={pantry} setPantry={setPantry} />}
          />
          <Route
            path="/recipe/:id"
            element={<RecipeDetail pantry={pantry} />}
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                setFavorites={setFavorites}
                pantry={pantry}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Home from './pages/Home';
// import RecipeDetail from './pages/RecipeDetail';
// import Favorites from './pages/Favorites';

// import './styles/app.css';

// const App = () => {
//   return (
//     <Router>
//       <div className="app">
//         <nav>
//           <a href="/">Home</a> | <a href="/favorites">Favorites</a>
//         </nav>

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/recipe/:id" element={<RecipeDetail />} />
//           <Route path="/favorites" element={<Favorites />} />
//           <Route path="/recipe/:id" element={<RecipeDetail pantry={pantry} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;