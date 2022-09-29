import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function MealsDetail() {
  const { responseIdRecipe } = useContext(RecipesContext);

  const {
    strMealThumb, strMeal, strCategory, strInstructions, strYoutube,
  } = responseIdRecipe;
  const allValues = Object.entries(responseIdRecipe);

  const ingredients = [];
  allValues.filter((item) => item[0].includes('Ingredient'))
    .filter((item) => item[1] !== null && item[1] !== '')
    .forEach((item) => ingredients.push(item[1]));

  const measures = [];
  allValues.filter((item) => item[0].includes('Measure'))
    .filter((item) => item[1] !== null && item[1] !== ' ')
    .forEach((item) => measures.push(item[1]));

  console.log(ingredients);
  console.log(measures);

  const gatheringIngredientsAndMeasures = ingredients.map((ingredient, i) => measures
    .map((measure, index) => {
      if (i === index) {
        const both = ` ${ingredient} - ${measure}`;
        return both;
      }

      return '';
    }));

  const ingredientsAndMeasures = [];
  gatheringIngredientsAndMeasures.forEach((one) => {
    ingredientsAndMeasures.push(one.filter((item) => item !== ''));
  });

  let linkEmbed;
  const linkEmbedStart = 32;
  if (strYoutube) {
    linkEmbed = strYoutube.substring(linkEmbedStart);
  }

  return (
    <div>
      <h3 data-testid="recipe-title">{ strMeal }</h3>

      <img
        src={ strMealThumb }
        alt={ strMeal }
        width="100px"
        data-testid="recipe-photo"
      />

      <p data-testid="recipe-category">{ strCategory }</p>

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
