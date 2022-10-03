import React, { useContext, useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/RecipesInProgress.css';

function MealsDetail() {
  const [copySource, setCopySource] = useState(false);
  const [isFavorite, setIsFavorite] = useState('');
  const { responseIdRecipe, recomendedRecipes,
    recipesInProgress, setFinishRecipeButtonDisabled } = useContext(RecipesContext);

  const {
    strMealThumb, strMeal, strCategory, strInstructions, strYoutube, idMeal, strArea,
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

  useEffect(() => {
    // localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      setIsFavorite(favoriteRecipes.some((item) => item.id === idMeal));
    }
  }, [idMeal]);

  const onClickShareButton = () => {
    setCopySource(true);
    copy(`http://localhost:3000/meals/${idMeal}`);
  };

  const onClickFavoriteButton = () => {
    setIsFavorite((prevState) => !prevState);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const obj = {
      alcoholicOrNot: '',
      category: strCategory,
      id: idMeal,
      image: strMealThumb,
      name: strMeal,
      nationality: strArea,
      type: 'meal',
    };

    if (favoriteRecipes !== null) {
      const alreadyFavorite = favoriteRecipes.some((item) => item.id === idMeal);

      if (alreadyFavorite) {
        const newFavorites = favoriteRecipes.filter((item) => item.id !== idMeal);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      }
      if (!alreadyFavorite) {
        const favorites = JSON.stringify([...favoriteRecipes, obj]);
        localStorage.setItem('favoriteRecipes', favorites);
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
    }
  };

  const checkedIngredients = () => {
    const ingredientsForCheck = document.querySelectorAll('.ingredientsInProgress');
    ingredientsForCheck.forEach((ingredient) => {
      if (ingredient.checked === true) {
        ingredient.parentNode.className = 'recipeInProgressChecked';
      } else {
        ingredient.parentNode.className = 'ingredientsInProgress';
      }
    });
    const ingredientsChecked = document.querySelectorAll('.recipeInProgressChecked');
    if (ingredientsChecked.length === ingredientsAndMeasures.length) {
      setFinishRecipeButtonDisabled(false);
    } else {
      setFinishRecipeButtonDisabled(true);
    }
  };

  return (
    <div>
      <h3 data-testid="recipe-title">{ strMeal }</h3>

      {
        isFavorite ? (
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ onClickFavoriteButton }
            src={ blackHeartIcon }
          >

            <img
              src={ blackHeartIcon }
              alt="favorite-icon"
            />
          </button>
        ) : (
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ onClickFavoriteButton }
            src={ whiteHeartIcon }
          >
            <img
              src={ whiteHeartIcon }
              alt="favorite-icon"
            />
          </button>
        )
      }

      <button
        type="button"
        data-testid="share-btn"
        onClick={ onClickShareButton }
        onKeyPress={ () => {} }
        tabIndex="0"
      >
        <img
          src={ shareIcon }
          alt="compartilhar"
        />
      </button>

      { copySource && <span>Link copied!</span> }

      <img
        src={ strMealThumb }
        alt={ strMeal }
        width="100px"
        data-testid="recipe-photo"
      />

      <p data-testid="recipe-category">{ strCategory }</p>

      {
        recipesInProgress ? (
          ingredientsAndMeasures.map((item, index) => (
            <label
              key={ index }
              htmlFor={ item }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                id={ index }
                name={ item }
                className="ingredientsInProgress"
                onChange={ checkedIngredients }
              />
              { item }
            </label>
          ))
        ) : (
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
        )
      }

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
