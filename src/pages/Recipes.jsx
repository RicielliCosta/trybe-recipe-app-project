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
  requestDrinkByCategory,
  requestRecipes,
} from '../services/recipesAPI';

const dbName = {
  meals: 'meal',
  drinks: 'cocktail',
};

function Recipes({ history: { push, location: { pathname } } }) {
  const [showFilteredRecipes, setShowFilteredRecipes] = useState(false);

  const {
    categories,
    filteredRecipes,
    recipeDetail,
    responseRecipes,
    setCategories,
    setFilteredRecipes,
    setResponseRecipes,
    setPageTitle,
  } = useContext(RecipesContext);

  const routeName = window.location.pathname.substring(1);
  const db = dbName[routeName];

  const getCategories = async () => {
    const url = `https://www.the${db}db.com/api/json/v1/1/list.php?c=list`;
    const response = await requestRecipes(url);
    console.log(response[routeName]);
    const categoriesObj = response[routeName].filter((item, index) => {
      const categoriesLimit = 5;
      if (index < categoriesLimit) {
        return item;
      }
      return '';
    });
    const categoriesArray = [];
    categoriesObj.forEach((item) => categoriesArray.push(item.strCategory));
    setCategories(categoriesArray);
  };

  useEffect(async () => {
    const url = `https://www.the${db}db.com/api/json/v1/1/search.php?s=`;
    const response = await requestRecipes(url);
    const recipes = response[routeName].filter((item, index) => {
      const limit = 12;
      if (index < limit) {
        return item;
      }
      return '';
    });
    setResponseRecipes(recipes);
    setFilteredRecipes(recipes);
    getCategories();

    setPageTitle(routeName[0].toUpperCase() + routeName.slice(1));
  }, [pathname]);

  const mealsCards = () => {
    if (showFilteredRecipes) {
      const cards = filteredRecipes.map((item, index) => {
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

    return responseRecipes.map((item, index) => {
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
      const cards = filteredRecipes.map((item, index) => {
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
    return responseRecipes.map((item, index) => {
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
        const limitRecipes = 12;
        if (index < limitRecipes) {
          return item;
        }
        return '';
      });
      setFilteredRecipes(result12);
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
      setFilteredRecipes(result12);
      setShowFilteredRecipes((prevState) => !prevState);
    }
  };

  const onClickAllFilter = () => {
    setFilteredRecipes(responseRecipes);
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
          categories.map((item, index) => (
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
