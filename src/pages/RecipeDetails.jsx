/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import propTypes from 'prop-types';
import copy from 'clipboard-copy';
import { requestRecipes } from '../services/recipesAPI';
import RecipesContext from '../context/RecipesContext';
import MealsDetail from '../components/MealsDetail';
import DrinksDetail from '../components/DrinksDetail';
import '../css/RecipesDetails.css';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails({ history: { push }, match: { params: { id }, url } }) {
  const [copySource, setCopySource] = useState(false);
  const [isRecipeDone, setIsRecipeDone] = useState(false);
  const [recipesProgressButton, setRecipesProgressButton] = useState('Start Recipe');
  const {
    responseIdRecipe, setResponseIdRecipe, setRecomendedRecipes, setPageTitle,
  } = useContext(RecipesContext);

  const dbName = { meals: 'meal', drinks: 'cocktail' };
  const SEVEN = 7;
  const routeName = window.location.pathname.substring(1, SEVEN);

  const meals = 'meals';
  const drinks = 'drinks';

  let db;
  let key;
  if (routeName.includes(meals)) {
    db = dbName[meals];
    key = meals;
  }
  if (routeName === drinks) {
    db = dbName[drinks];
    key = drinks;
  }

  const readLocalStorage = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const startedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (doneRecipes) {
      setIsRecipeDone(doneRecipes.some((item) => item.id === id));
    } else {
      setIsRecipeDone(false);
    }
    if (startedRecipes && startedRecipes[key][id]) {
      setRecipesProgressButton('Continue Recipe');
    } else {
      setRecipesProgressButton('Start Recipe');
    }
  };

  const requestRecipeForId = async () => {
    const URL = `https://www.the${db}db.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await requestRecipes(URL);
    if (routeName.includes(meals)) {
      setResponseIdRecipe(response.meals[0]);
    }
    if (routeName.includes(drinks)) {
      setResponseIdRecipe(response.drinks[0]);
    }
  };

  const requestRecomendedRecipe = async () => {
    let type;
    if (routeName.includes(meals)) {
      type = dbName[drinks];
    }
    if (routeName === drinks) {
      type = dbName[meals];
    }

    const URL = `https://www.the${type}db.com/api/json/v1/1/search.php?s=`;
    const response = await requestRecipes(URL);
    if (routeName.includes(meals)) {
      setRecomendedRecipes(response.drinks);
    }
    if (routeName.includes(drinks)) {
      setRecomendedRecipes(response.meals);
    }
  };

  useEffect(() => {
    requestRecipeForId();
    requestRecomendedRecipe();
    readLocalStorage();
  }, []);

  const onClickStartRecipe = () => {
    setPageTitle(key[0].toUpperCase() + key.slice(1));
    push(`/${key}/${id}/in-progress`);
  };

  const onClickShareButton = () => {
    setCopySource(true);
    copy(`http://localhost:3000${url}`);
  };

  const onClickFavoriteButton = () => {
    if (url.includes(drinks)) {
      const {
        idDrink, strAlcoholic, strDrinkThumb, strCategory, strDrink,
      } = responseIdRecipe;
      const obj = {
        alcoholicOrNot: strAlcoholic,
        category: strCategory,
        id: idDrink,
        image: strDrinkThumb,
        name: strDrink,
        nationality: '',
        type: 'drink',
      };
      const favorites = JSON.stringify([obj]);
      localStorage.setItem('favoriteRecipes', favorites);
    }

    if (url.includes(meals)) {
      const {
        idMeal, strMeal, strCategory, strMealThumb, strArea,
      } = responseIdRecipe;
      const obj = {
        alcoholicOrNot: '',
        category: strCategory,
        id: idMeal,
        image: strMealThumb,
        name: strMeal,
        nationality: strArea,
        type: 'meal',
      };
      const favorites = JSON.stringify([obj]);
      localStorage.setItem('favoriteRecipes', favorites);
    }
  };

  return (
    <div>

      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ onClickFavoriteButton }
      >
        Favorite
      </button>

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

      { routeName === 'meals/' && <MealsDetail /> }
      { routeName === 'drinks' && <DrinksDetail /> }

      {
        !isRecipeDone && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-button"
            onClick={ onClickStartRecipe }
          >
            { recipesProgressButton }
          </button>
        )
      }

    </div>
  );
}

RecipeDetails.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired }).isRequired,
    url: propTypes.string.isRequired,
  }).isRequired,
  location: propTypes.shape({
    pathname: propTypes.string.isRequired,
  }).isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default RecipeDetails;
