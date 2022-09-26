import React, { useState } from 'react';
import propTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [pageTitle, setPageTitle] = useState('Meals');
  const [showSearchButton, setShowSearchButton] = useState(true);

  const contextType = {
    pageTitle,
    showSearchButton,
    setPageTitle,
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