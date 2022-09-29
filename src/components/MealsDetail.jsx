import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

const NINE = 9;
const TWENTY_NINE = 29;
const THIRTY_TWO = 32;

function MealsDetail() {
  const { responseForApi, loading } = useContext(RecipesContext);

  let linkEmbed;

  const allValuesToResponse = Object.values(responseForApi);
  const ingredientsValues = allValuesToResponse.slice(NINE, TWENTY_NINE);
  const ingredients = ingredientsValues.filter((ingredient) => ingredient.length > 0);

  //   const measuresValues = allValuesToResponse.slice(29, 49);
  //   const measures = measuresValues.filter((measure) => measure.length > 0);

  const { strMealThumb: image, strMeal: title, strCategory: category,
    strInstructions: instructions, strYoutube } = responseForApi;

  if (strYoutube !== undefined) {
    linkEmbed = strYoutube.substring(THIRTY_TWO);
  }

  return (
    <div>
      RecipeDetails
      <h4 data-testid="recipe-title">{ title }</h4>
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
      <iframe
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${linkEmbed}` }
        title="YouTube video player"
        data-testid="video"
      />
    </div>
  );
}

export default MealsDetail;
