import React, { useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function Recipes({ history: { push, location: { pathname } } }) {
  const { setPageTitle, recipeDetail } = useContext(RecipesContext);
  useEffect(() => {
    if (pathname === '/drinks') {
      setPageTitle('Drinks');
    }
    if (pathname === '/meals') {
      setPageTitle('Meals');
    }
  }, []);

  useEffect(() => {
    if (recipeDetail.id !== '') {
      push(`${recipeDetail.type}/${recipeDetail.id}`);
    }
  }, [recipeDetail]);

  return (
    <div>
      <Header />
      Receitas
    </div>
  );
}

Recipes.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
    location: propTypes.shape({
      pathname: propTypes.string.isRequired }).isRequired }).isRequired,
};

export default Recipes;
