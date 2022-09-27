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

  const [responseRecipes, setResponseRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const contextType = {
    categories,
    filteredRecipes,
    pageTitle,
    recipeDetail,
    responseRecipes,
    showSearchButton,
    setFilteredRecipes,
    setCategories,
    setResponseRecipes,
    setPageTitle,
    setShowSearchButton,
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
