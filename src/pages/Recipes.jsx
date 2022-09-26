/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import { requestMealsRecipes, requestDrinksRecipes } from '../services/recipesAPI';
import '../css/Recipes.css';

function Recipes({ history: { location: { pathname } } }) {
  const {
    drinksResponse,
    mealsResponse,
    setDrinksResponse,
    setMealsResponse,
    setPageTitle,
  } = useContext(RecipesContext);

  useEffect(async () => {
    if (pathname === '/meals') {
      setPageTitle('Meals');
      const response = await requestMealsRecipes();
      const mealRecipes = response.meals.filter((item, index) => {
        const mealsLimit = 12;
        if (index < mealsLimit) {
          return item;
        }
        return '';
      });
      setMealsResponse(mealRecipes);
    }

    if (pathname === '/drinks') {
      setPageTitle('Drinks');
      const response = await requestDrinksRecipes();
      const drinksRecipes = response.drinks.filter((item, index) => {
        const drinksLimit = 12;
        if (index < drinksLimit) {
          return item;
        }
        return '';
      });
      setDrinksResponse(drinksRecipes);
    }
  }, []);

  const mealsCards = () => {
    const cards = mealsResponse.map((item, index) => {
      const { strMealThumb, strMeal } = item;
      return (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid={ `${index}-card-img` }
            className="meal-img"
          />
          <span data-testid={ `${index}-card-name` }>{ strMeal }</span>
        </div>
      );
    });
    return cards;
  };

  const drinksCards = () => {
    const cards = drinksResponse.map((item, index) => {
      const { strDrinkThumb, strDrink } = item;
      return (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            data-testid={ `${index}-card-img` }
            className="meal-img"
          />
          <span data-testid={ `${index}-card-name` }>{ strDrink }</span>
        </div>
      );
    });
    return cards;
  };

  return (
    <div>
      <Header />
      <div>
        { pathname === '/meals' && mealsCards() }
        { pathname === '/drinks' && drinksCards() }
      </div>
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  history: propTypes.shape({ location: propTypes.shape({
    pathname: propTypes.string.isRequired }).isRequired }).isRequired,
};

export default Recipes;
