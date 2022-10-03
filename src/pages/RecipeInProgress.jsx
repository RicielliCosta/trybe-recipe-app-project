import React, { useContext, useEffect } from 'react';
// import Header from '../components/Header';
import propTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import MealsDetail from '../components/MealsDetail';
import DrinksDetail from '../components/DrinksDetail';
import { requestRecipes } from '../services/recipesAPI';

function RecipeInProgress({ history: { push }, match: { params: { id }, url } }) {
  const { setShowSearchButton, setPageTitle,
    setRecipesInProgress, setResponseIdRecipe,
    finishRecipeButtonDisabled } = useContext(RecipesContext);
  const SEVEN = 7;
  const routeName = window.location.pathname.substring(1, SEVEN);

  const meals = 'meals';
  const drinks = 'drinks';
  const dbName = { meals: 'meal', drinks: 'cocktail' };
  let db;
  if (routeName.includes(meals)) {
    db = dbName[meals];
  }
  if (routeName === drinks) {
    db = dbName[drinks];
  }

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

  useEffect(() => {
    setShowSearchButton(true);
    requestRecipeForId();
    setPageTitle('teste');
    setRecipesInProgress(true);
  }, []);

  const finishRecipeButton = () => {
    push('/done-recipes');
  };

  return (
    <div>
      <h1>RecipeInProgress</h1>
      { routeName === 'meals/' && <MealsDetail url={ url } /> }
      { routeName === 'drinks' && <DrinksDetail url={ url } /> }

      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ finishRecipeButton }
        disabled={ finishRecipeButtonDisabled }
      >
        Finish Recipe
      </button>

    </div>
  );
}

RecipeInProgress.propTypes = {
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

export default RecipeInProgress;
