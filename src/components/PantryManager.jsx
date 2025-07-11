import React, { useState } from 'react';

const PantryManager = ({ setPantry, onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearchClick = () => {
    const parsedIngredients = input
      .split(',')
      .map(item => item.trim().toLowerCase())
      .filter(item => item.length > 0);

    setPantry(parsedIngredients);
    onSearch(parsedIngredients);
  };

  return (
    <div className="pantry-manager">
      <h3>What's in your kitchen?</h3>
      <input
        type="text"
        placeholder="e.g. chicken, onion, rice"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearchClick}>Search Recipes</button>
    </div>
  );
};

export default PantryManager;