/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import propTypes from 'prop-types';
import { requestRecipes } from '../services/recipesAPI';
import RecipesContext from '../context/RecipesContext';
import MealsDetail from '../components/MealsDetail';
import DrinksDetail from '../components/DrinksDetail';
import '../css/RecipesDetails.css';

function RecipeDetails({ match: { params: { id } } }) {
  const { setResponseIdRecipe, setRecomendedRecipes } = useContext(RecipesContext);
  const [isRecipeDone, setIsRecipeDone] = useState(false);

  const dbName = { meals: 'meal', drinks: 'cocktail' };
  const SEVEN = 7;
  const routeName = window.location.pathname.substring(1, SEVEN);

  const meals = 'meals';
  const drinks = 'drinks';

  let db;
  if (routeName.includes(meals)) {
    db = dbName[meals];
  }
  if (routeName === drinks) {
    db = dbName[drinks];
  }

  useEffect(() => {
    const requestRecipeForId = async () => {
      const url = `https://www.the${db}db.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await requestRecipes(url);
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

      const url = `https://www.the${type}db.com/api/json/v1/1/search.php?s=`;
      const response = await requestRecipes(url);
      if (routeName.includes(meals)) {
        setRecomendedRecipes(response.drinks);
      }
      if (routeName.includes(drinks)) {
        setRecomendedRecipes(response.meals);
      }
    };

    requestRecipeForId();
    requestRecomendedRecipe();
  }, [db, id, setResponseIdRecipe]);

  useEffect(() => {
    const initialDoneRecipes = JSON.stringify([{
      id: 'id-da-receita',
      type: 'meal-ou-drink',
      nationality: 'nacionalidade-da-receita-ou-texto-vazio',
      category: 'categoria-da-receita-ou-texto-vazio',
      alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
      name: 'nome-da-receita',
      image: 'imagem-da-receita',
      doneDate: 'quando-a-receita-foi-concluida',
      tags: 'array-de-tags-da-receita-ou-array-vazio',
    }]);
    localStorage.setItem('doneRecipes', initialDoneRecipes);

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setIsRecipeDone(doneRecipes.some((item) => item.id === id));
    return () => {
      setIsRecipeDone((prevState) => !prevState);
    };
  }, []);

  return (
    <div>
      { routeName === 'meals/' && <MealsDetail /> }
      { routeName === 'drinks' && <DrinksDetail /> }

      {
        isRecipeDone ? '' : (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-button"
          >
            Start Recipe
          </button>
        )
      }

    </div>
  );
}

RecipeDetails.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired }).isRequired }).isRequired,
  location: propTypes.shape({
    pathname: propTypes.string.isRequired,
  }).isRequired,
};

export default RecipeDetails;
