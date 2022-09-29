import React, { useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import { requestRecipes } from '../services/recipesAPI';
import RecipesContext from '../context/RecipesContext';
import MealsDetail from '../components/MealsDetail';
import DrinksDetail from '../components/DrinksDetail';

function RecipeDetails({ match: { params: { id } } }) {
  const { setResponseForApi, setLoading } = useContext(RecipesContext);
  let db;

  const dbName = {
    meals: 'meal',
    drinks: 'cocktail',
  };
  const FIVE = 5;
  const routeName = window.location.pathname.substring(1);
  let dbType = routeName.substring(0, FIVE);
  const drinks = 'drinks';
  if (dbType === 'meals') {
    db = dbName[dbType];
  } else {
    db = dbName[drinks];
    dbType = 'drinks';
  }

  const requestRecipeForId = async () => {
    const url = `https://www.the${db}db.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await requestRecipes(url);
    setResponseForApi(response[dbType][0]);
    setLoading(false);
  };

  useEffect(() => {
    requestRecipeForId();
  }, []);

  return (
    <div>
      RecipeDetails
      { dbType === 'meals' && <MealsDetail /> }
      { dbType === 'drinks' && <DrinksDetail /> }
    </div>
  );
}

RecipeDetails.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired }).isRequired }).isRequired,
};

export default RecipeDetails;
