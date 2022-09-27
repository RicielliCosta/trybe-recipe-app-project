/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import propTypes from 'prop-types';
import '../css/Recipes.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import {
  requestMealByCategory,
  requestMealsCategories,
  requestMealsRecipes,
  requestDrinkByCategory,
  requestDrinksCategories,
  requestDrinksRecipes,
} from '../services/recipesAPI';


function Recipes({ history: { push, location: { pathname } } }) {
  const { setPageTitle, recipeDetail } = useContext(RecipesContext);
  const [showFilteredRecipes, setShowFilteredRecipes] = useState(false);

  const {
    drinksCategories,
    drinksResponse,
    filteredDrinks,
    filteredMeals,
    mealsCategories,
    mealsResponse,
    setDrinksCategories,
    setDrinksResponse,
    setFilteredDrinks,
    setFilteredMeals,
    setMealsCategories,
    setMealsResponse,
    setPageTitle,
  } = useContext(RecipesContext);

  const getMealsCategories = async () => {
    const response = await requestMealsCategories();
    const categoriesObj = response.meals.filter((item, index) => {
      const categoriesLimit = 5;
      if (index < categoriesLimit) {
        return item;
      }
      return '';
    });
    const categoriesArray = [];
    categoriesObj.forEach((item) => categoriesArray.push(item.strCategory));
    setMealsCategories(categoriesArray);
  };

  const getDrinksCategories = async () => {
    const response = await requestDrinksCategories();
    const categoriesObj = response.drinks.filter((item, index) => {
      const limit = 5;
      if (index < limit) {
        return item;
      }
      return '';
    });
    const categoriesArray = [];
    categoriesObj.forEach((item) => categoriesArray.push(item.strCategory));
    setDrinksCategories(categoriesArray);
  };

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
      setFilteredMeals(mealRecipes);
      getMealsCategories();
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
      setFilteredDrinks(drinksRecipes);
      getDrinksCategories();
    }
  }, [pathname]);

  const mealsCards = () => {
    if (showFilteredRecipes) {
      const cards = filteredMeals.map((item, index) => {
        const { strMealThumb, strMeal, idMeal } = item;
        return (
          <Link
            key={ index }
            to={ `meals/${idMeal}` }
          >
            <div
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
                className="meal-img"
              />
              <span data-testid={ `${index}-card-name` }>{ strMeal }</span>
            </div>
          </Link>
        );
      });
      return cards;
    }

    return mealsResponse.map((item, index) => {
      const { strMealThumb, strMeal, idMeal } = item;
      return (
        <Link
          key={ index }
          to={ `meals/${idMeal}` }
        >
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
        </Link>
      );
    });
  };

  const drinksCards = () => {
    if (showFilteredRecipes) {
      const cards = filteredDrinks.map((item, index) => {
        const { strDrinkThumb, strDrink, idDrink } = item;
        return (
          <Link
            key={ index }
            to={ `drinks/${idDrink}` }
          >
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
          </Link>
        );
      });
      return cards;
    }
    return drinksResponse.map((item, index) => {
      const { strDrinkThumb, strDrink, idDrink } = item;
      return (
        <Link
          key={ index }
          to={ `drinks/${idDrink}` }
        >
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
        </Link>
      );
    });
  };

  const onClickCategoryButton = async ({ target: { name } }) => {
    if (pathname === '/meals') {
      const response = await requestMealByCategory(name);
      const result12 = await response.meals.filter((item, index) => {
        const limit = 12;
        if (index < limit) {
          return item;
        }
        return '';
      });
      setFilteredMeals(result12);
      setShowFilteredRecipes((prevState) => !prevState);
    }

    if (pathname === '/drinks') {
      const response = await requestDrinkByCategory(name);
      const result12 = await response.drinks.filter((item, index) => {
        const sizelimit = 12;
        if (index < sizelimit) {
          return item;
        }
        return '';
      });
      setFilteredDrinks(result12);
      setShowFilteredRecipes((prevState) => !prevState);
    }
  };

  const onClickAllFilter = () => {
    if (pathname === '/meals') {
      setFilteredMeals(mealsResponse);
    }

    if (pathname === '/drinks') {
      setFilteredDrinks(drinksResponse);
    }
  };

  useEffect(() => {
    if (recipeDetail.id !== '') {
      push(`${recipeDetail.type}/${recipeDetail.id}`);
    }
  }, [recipeDetail]);

  return (
    <div>
      <Header />

      <div>
        {
          pathname === '/meals' ? (
            mealsCategories.map((item, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ `${item}-category-filter` }
                name={ item }
                onClick={ onClickCategoryButton }
              >
                { item }
              </button>
            ))
          ) : (
            drinksCategories.map((item) => (
              <button
                type="button"
                key={ item }
                data-testid={ `${item}-category-filter` }
                name={ item }
                onClick={ onClickCategoryButton }
              >
                { item }
              </button>
            ))
          )
        }
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ onClickAllFilter }
        >
          All
        </button>
      </div>

      <div>
        { pathname === '/meals' && mealsCards() }
        { pathname === '/drinks' && drinksCards() }
      </div>
      <Footer />
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
