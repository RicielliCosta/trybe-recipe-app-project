import React, { useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function Recipes({ history: { location: { pathname } } }) {
  const { setPageTitle } = useContext(RecipesContext);
  useEffect(() => {
    if (pathname === '/drinks') {
      setPageTitle('Drinks');
    }
    if (pathname === '/meals') {
      setPageTitle('Meals');
    }
  }, []);

  return (
    <div>
      <Header />
      Receitas
    </div>
  );
}

Recipes.propTypes = {
  history: propTypes.shape({ location: propTypes.shape({
    pathname: propTypes.string.isRequired }).isRequired }).isRequired,
};

export default Recipes;
