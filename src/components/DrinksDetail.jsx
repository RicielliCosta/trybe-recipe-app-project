import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function DrinksDetail() {
  const { responseIdRecipe } = useContext(RecipesContext);
  const {
    strDrinkThumb, strDrink, strInstructions, strAlcoholic,
  } = responseIdRecipe;
  const allValues = Object.entries(responseIdRecipe);

  const ingredients = [];
  allValues.filter((item) => item[0].includes('Ingredient'))
    .filter((item) => item[1] !== null)
    .forEach((item) => ingredients.push(item[1]));

  const measures = [];
  allValues.filter((item) => item[0].includes('Measure'))
    .filter((item) => item[1] !== null && item[1] !== '')
    .forEach((item) => measures.push(item[1]));

  const gatheringIngredientsAndMeasures = ingredients.map((ingredient, i) => measures
    .map((measure, index) => {
      if (i === index) {
        const both = ` ${ingredient} - ${measure}`;
        return both;
      }

      if (i > index) {
        return ingredient;
      }

      return '';
    }));

  const ingredientsAndMeasures = [];
  gatheringIngredientsAndMeasures.forEach((one) => {
    ingredientsAndMeasures.push(one.filter((item) => item !== ''));
  });

  return (
    <div>
      <h3 data-testid="recipe-title">{ strDrink }</h3>

      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        width="100px"
        data-testid="recipe-photo"
      />

      <span data-testid="recipe-category">{ strAlcoholic }</span>

      <ul>
        { ingredientsAndMeasures.map((item, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { item }
          </li>
        )) }
      </ul>

      <p data-testid="instructions">{ strInstructions }</p>

    </div>
  );
}

export default DrinksDetail;
