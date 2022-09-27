import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import recipesRequest from '../services/recipesAPI';
import RecipesContext from '../context/RecipesContext';

const dbName = {
  meals: 'meal',
  drinks: 'cocktail',
};

const dbId = {
  meals: 'idMeal',
  drinks: 'idDrink',
};

function SearchBar() {
  const [searchRadio, setSearchRadio] = useState('');
  const [textSearch, setTextSearch] = useState('');
  const { setRecipeDetail } = useContext(RecipesContext);

  const routeName = window.location.pathname.substring(1);

  const onClickSearch = async () => {
    console.log(routeName);
    const db = dbName[routeName];
    const urlIngredient = `https://www.the${db}db.com/api/json/v1/1/filter.php?`;
    const urlName = `https://www.the${db}db.com/api/json/v1/1/search.php?`;
    let response;
    switch (searchRadio) {
    case 'ingredient':
      response = await recipesRequest(`${urlIngredient}i=${textSearch}`);
      break;
    case 'name':
      response = await recipesRequest(`${urlName}s=${textSearch}`);
      break;
    default:
      if (textSearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        response = await recipesRequest(`${urlName}f=${textSearch}`);
      }
      break;
    }
    if (response) {
      if (!response[routeName]) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (response[routeName].length === 1) {
        setRecipeDetail({
          type: `/${routeName}`,
          id: response[routeName][0][dbId[routeName]],
        });
      }
    }
  };

  return (
    <div>
      <label htmlFor="text-search-input">
        <span>Busca: </span>
        <input
          type="text"
          data-testid="search-input"
          id="text-search-input"
          value={ textSearch }
          onChange={ ({ target }) => setTextSearch(target.value) }
        />
      </label>
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          name="search-radio"
          value="ingredient"
          checked={ searchRadio === 'ingredient' }
          data-testid="ingredient-search-radio"
          onChange={ () => setSearchRadio('ingredient') }
        />
        Ingredient
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          name="search-radio"
          value="name"
          checked={ searchRadio === 'name' }
          data-testid="name-search-radio"
          onChange={ () => setSearchRadio('name') }
        />
        Name
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          name="search-radio"
          value="letter"
          checked={ searchRadio === 'letter' }
          data-testid="first-letter-search-radio"
          onChange={ () => setSearchRadio('letter') }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => onClickSearch() }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
