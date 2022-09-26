import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function FavoriteRecipes() {
  const { setShowSearchButton, setPageTitle } = useContext(RecipesContext);

  useEffect(() => {
    setShowSearchButton(false);
    setPageTitle('Favorite Recipes');
  }, []);

  return (
    <div>
      <Header />
      FavoriteRecipes
    </div>
  );
}

export default FavoriteRecipes;
