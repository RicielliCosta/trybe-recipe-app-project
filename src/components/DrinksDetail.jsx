import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

const SEVENTEEN = 17;
const THIRTY_TWO = 32;

function DrinksDetail() {
  const { responseForApi } = useContext(RecipesContext);

  const allValuesToResponse = Object.values(responseForApi);
  const ingredientsValues = allValuesToResponse.slice(SEVENTEEN, THIRTY_TWO);
  const ingredients = ingredientsValues.filter((ingredient) => ingredient !== null);
  console.log(ingredients);
  //   const measuresValues = allValuesToResponse.slice(32, 47);
  //   const measures = measuresValues.filter((measure) => measure.length > 0);

  const { strAlcoholic, strGlass: title, strCategory: category,
    strInstructions: instructions, strDrinkThumb: image } = responseForApi;

  return (
    <div>
      <h4 data-testid="recipe-title">{ title }</h4>
      <p>{ strAlcoholic }</p>
      <img
        src={ image }
        alt={ title }
        width="100px"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-category">{ category }</p>
      { ingredients.map((ingredient, index) => (
        <ul key={ index }>
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { ingredient }
          </li>
        </ul>
      )) }
      <p data-testid="instructions">{ instructions }</p>
    </div>
  );
}

export default DrinksDetail;
