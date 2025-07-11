import React from 'react';

const IngredientChecklist = ({ ingredients, pantry }) => {
  return (
    <div className="ingredient-checklist">
      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((ingredient, index) => {
          const hasItem = pantry.includes(ingredient.toLowerCase());

          return (
            <li
              key={index}
              style={{
                color: hasItem ? 'green' : 'red',
                fontWeight: hasItem ? 'bold' : 'normal'
              }}
            >
              {hasItem ? '✅' : '❌'} {ingredient}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IngredientChecklist;