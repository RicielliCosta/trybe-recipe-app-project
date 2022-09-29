import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function MealsDetail() {
  const { responseIdRecipe } = useContext(RecipesContext);

  const {
    strMealThumb, strMeal, strCategory, strInstructions, strYoutube,
  } = responseIdRecipe;
  const allValues = Object.values(responseIdRecipe);

  const ingredientsStart = 9;
  const ingredientsEnd = 29;
  const measuresStart = 29;
  const measuresEnd = 49;
  const ingredients = allValues.slice(ingredientsStart, ingredientsEnd)
    .filter((item) => item !== '');
  const measures = allValues.slice(measuresStart, measuresEnd)
    .filter((item) => item !== ' ');

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
