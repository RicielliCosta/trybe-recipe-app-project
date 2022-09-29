import React, { useContext, useState } from 'react';
import copy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';

function MealsDetail() {
  const { responseIdRecipe, recomendedRecipes } = useContext(RecipesContext);
  const [copySource, setCopySource] = useState(false);

  const {
    strMealThumb, strMeal, strCategory, strInstructions, strYoutube, strSource,
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

      <button
        type="button"
        data-testid="favorite-btn"
      >
        FAVORITE
      </button>
      <div
        role="button"
        data-testid="share-btn"
        onClick={ () => {
          copy(strSource);
          setCopySource(true);
        } }
        onKeyPress={ () => {} }
        tabIndex="0"
      >
        <img
          src={ shareIcon }
          alt="compartilhar"
        />
      </div>
      {/* <button
        type="button"
        data-testid="share-btn"
        onKeyDown={ () => {} }
        onClick={ () => {
          copy(strSource);
          setCopySource(true);
        } }
      >
        <img src={ shareIcon } alt />
      </button> */}

      { copySource && <p>Link copied!</p> }

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

      <span>Recomended recipes:</span>
      <div className="recomended-recipes">
        {
          recomendedRecipes.map((item, index) => {
            const { strDrinkThumb, strDrink } = item;
            const limitSize = 6;
            if (index < limitSize) {
              return (

                <div
                  key={ index }
                  data-testid={ `${index}-recommendation-card` }
                >
                  <img
                    src={ strDrinkThumb }
                    alt={ strDrink }
                    width="100px"
                  />

                  <span data-testid={ `${index}-recommendation-title` }>
                    { strDrink }
                  </span>
                </div>
              );
            }
            return '';
          })
        }
      </div>
    </div>
  );
}

export default MealsDetail;
