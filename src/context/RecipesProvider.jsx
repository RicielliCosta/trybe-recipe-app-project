import React, { useState } from 'react';
import propTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const object = { type: '/meals', id: '' };

  const [categories, setCategories] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [pageTitle, setPageTitle] = useState('Meals');
  const [recipeDetail, setRecipeDetail] = useState(object);
  const [responseRecipes, setResponseRecipes] = useState([]);
  const [showFilteredRecipes, setShowFilteredRecipes] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(true);
  const [responseIdRecipe, setResponseIdRecipe] = useState({});
  const [loading, setLoading] = useState(true);

  const contextType = {
    categories,
    filteredRecipes,
    loading,
    pageTitle,
    recipeDetail,
    responseIdRecipe,
    responseRecipes,
    showFilteredRecipes,
    showSearchButton,
    setCategories,
    setFilteredRecipes,
    setLoading,
    setPageTitle,
    setRecipeDetail,
    setResponseIdRecipe,
    setResponseRecipes,
    setShowFilteredRecipes,
    setShowSearchButton,
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
