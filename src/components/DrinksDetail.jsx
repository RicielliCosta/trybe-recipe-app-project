/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import copy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/RecipesInProgress.css';

function DrinksDetail({ url }) {
  const [copySource, setCopySource] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { responseIdRecipe, recomendedRecipes,
    recipesInProgress } = useContext(RecipesContext);
  const {
    strDrinkThumb, strDrink, strInstructions, strAlcoholic, idDrink, strCategory,
  } = responseIdRecipe;
  const allValues = Object.entries(responseIdRecipe);

  const ingredients = [];
  allValues.filter((item) => item[0].includes('Ingredient'))
    .filter((item) => item[1] !== null && item[1] !== '')
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

      return '';
    }));

  const ingredientsAndMeasures = [];
  gatheringIngredientsAndMeasures.forEach((one) => {
    ingredientsAndMeasures.push(one.filter((item) => item !== ''));
  });

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      setIsFavorite(favoriteRecipes.some((item) => item.id === idDrink));
    }
  }, [idDrink]);

  const onClickShareButton = () => {
    setCopySource(true);
    copy(`http://localhost:3000${url}`);
  };

  const onClickFavoriteButton = () => {
    setIsFavorite((prevState) => !prevState);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const obj = {
      alcoholicOrNot: strAlcoholic,
      category: strCategory,
      id: idDrink,
      image: strDrinkThumb,
      name: strDrink,
      nationality: '',
      type: 'drink',
    };

    if (favoriteRecipes !== null) {
      const alreadyFavorite = favoriteRecipes.some((item) => item.id === idDrink);

      if (alreadyFavorite) {
        const newFavorites = favoriteRecipes.filter((item) => item.id !== idDrink);
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
  };

  return (
    <div>
      <h3 data-testid="recipe-title">{ strDrink }</h3>

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
        src={ strDrinkThumb }
        alt={ strDrink }
        width="100px"
        data-testid="recipe-photo"
      />

      <span data-testid="recipe-category">{ strAlcoholic }</span>

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

      <span>Recomended recipes:</span>
      <div className="recomended-recipes">
        {
          recomendedRecipes.map((item, index) => {
            const { strMealThumb, strMeal } = item;
            const limitSize = 6;
            if (index < limitSize) {
              return (

                <div
                  key={ index }
                  data-testid={ `${index}-recommendation-card` }
                >
                  <img
                    src={ strMealThumb }
                    alt={ strMeal }
                    width="100px"
                  />

                  <span data-testid={ `${index}-recommendation-title` }>
                    { strMeal }
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

DrinksDetail.propTypes = {
  url: propTypes.string.isRequired,
};

export default DrinksDetail;
