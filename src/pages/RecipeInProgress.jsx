/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function RecipeInProgress() {
  const { setShowSearchButton, setPageTitle } = useContext(RecipesContext);

  useEffect(() => {
    setShowSearchButton(true);
    setPageTitle('teste');
  }, []);

  return (
    <div>
      <Header />
      <h1>RecipeInProgress</h1>
    </div>
  );
}

export default RecipeInProgress;
