/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function RecipeInProgress() {
  const { setShowSearchButton } = useContext(RecipesContext);

  useEffect(() => {
    console.log(pathname);
    setShowSearchButton(true);
  }, []);

  return (
    <div>
      <Header />
      RecipeInProgress
    </div>
  );
}

export default RecipeInProgress;
