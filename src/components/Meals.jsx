import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { requestMealByCategory } from '../services/recipesAPI';

function Meals() {
  const {
    categories,
    filteredRecipes,
    responseRecipes,
    setFilteredRecipes,
    showFilteredRecipes,
    setShowFilteredRecipes,
  } = useContext(RecipesContext);

  const mealsCards = () => {
    if (showFilteredRecipes) {
      const cards = filteredRecipes.map((item, index) => {
        const { strMealThumb, strMeal, idMeal } = item;
        return (
          <Link key={ index } to={ `meals/${idMeal}` }>
            <div data-testid={ `${index}-recipe-card` }>
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
        <Link key={ index } to={ `meals/${idMeal}` }>
          <div data-testid={ `${index}-recipe-card` } key={ index }>
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

  const onClickAllFilter = () => {
    setFilteredRecipes(responseRecipes);
  };

  const onClickCategoryButton = async ({ target: { name } }) => {
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
  };

  return (
    <div>
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
      { mealsCards() }
    </div>
  );
}

export default Meals;
