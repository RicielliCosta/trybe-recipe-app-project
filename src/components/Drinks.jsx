import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { requestDrinkByCategory } from '../services/recipesAPI';

function Drinks() {
  const {
    categories,
    filteredRecipes,
    responseRecipes,
    setFilteredRecipes,
    showFilteredRecipes,
    setShowFilteredRecipes,
  } = useContext(RecipesContext);

  const drinksCards = () => {
    if (showFilteredRecipes) {
      const cards = filteredRecipes.map((item, index) => {
        const { strDrinkThumb, strDrink, idDrink } = item;
        return (
          <Link key={ index } to={ `drinks/${idDrink}` }>
            <div data-testid={ `${index}-recipe-card` } key={ index }>
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
        <Link key={ index } to={ `drinks/${idDrink}` }>
          <div data-testid={ `${index}-recipe-card` } key={ index }>
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

  const onClickAllFilter = () => {
    setFilteredRecipes(responseRecipes);
  };

  const onClickCategoryButton = async ({ target: { name } }) => {
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
      { drinksCards() }
    </div>

  );
}

export default Drinks;
