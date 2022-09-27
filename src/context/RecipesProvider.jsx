import React, { useState } from 'react';
import propTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [pageTitle, setPageTitle] = useState('Meals');
  const [showSearchButton, setShowSearchButton] = useState(true);

  const [recipeDetail, setRecipeDetail] = useState({
    type: '/meals',
    id: '',
  });

  const [mealsResponse, setMealsResponse] = useState([]);
  const [drinksResponse, setDrinksResponse] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);

  const contextType = {
    drinksCategories,
    drinksResponse,
    filteredDrinks,
    filteredMeals,
    mealsCategories,
    mealsResponse,
    pageTitle,
    showSearchButton,
    setDrinksCategories,
    setDrinksResponse,
    setFilteredDrinks,
    setFilteredMeals,
    setMealsCategories,
    setMealsResponse,
    setPageTitle,
    setShowSearchButton,
    recipeDetail,
    setRecipeDetail,
  };

  return (
    <RecipesContext.Provider value={ contextType }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default RecipesProvider;
