/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function DoneRecipes() {
  const { setShowSearchButton, setPageTitle } = useContext(RecipesContext);

  useEffect(() => {
    setShowSearchButton(false);
    setPageTitle('Done Recipes');
  }, []);

  return (
    <div>
      <Header />
      DoneRecipes
    </div>
  );
}

export default DoneRecipes;
