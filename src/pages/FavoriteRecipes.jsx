/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';

const mockFavorites = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

function FavoriteRecipes() {
  const { setShowSearchButton, setPageTitle } = useContext(RecipesContext);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const getFavoriteRecipes = () => {
    const favoriteRecipesLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipesLS !== null) {
      setFavoriteRecipes(favoriteRecipesLS);
    }
  };

  useEffect(() => {
    setShowSearchButton(false);
    setPageTitle('Favorite Recipes');
    getFavoriteRecipes();
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorites));
  }, []);

  const renderFavoriteRecipes = () => {
    const result = favoriteRecipes.map((item, index) => {
      const {
        alcoholicOrNot, category, doneDate, image, name, nationality, type, id,
      } = item;
      return (
        <div key={ index }>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            Favorite
          </button>

          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => onClickShareButton(type, id) }
            onKeyPress={ () => {} }
            tabIndex="0"
            name={ id }
            src={ shareIcon }
          >
            <img
              src={ shareIcon }
              alt="compartilhar"
            />
          </button>

          <Link to={ `/${type}s/${id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
            <img
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
              width="100px"
            />
          </Link>

          <div>
            { type === 'meal' ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${nationality} - ${category}` }
              </p>
            ) : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${category} - ${alcoholicOrNot}` }
              </p>
            )}
          </div>

          <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
        </div>
      );
    });
    return result;
  };

  const onClickHandler = ({ target: { name } }) => {
    const doneRecipesLS = JSON.parse(localStorage.getItem('doneRecipes'));
    if (name === 'all') {
      setDoneRecipes(doneRecipesLS);
    }
    if (name === 'meal') {
      setDoneRecipes(doneRecipesLS.filter((item) => item.type === name));
    }
    if (name === 'drink') {
      setDoneRecipes(doneRecipesLS.filter((item) => item.type === name));
    }
  };

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="all"
        onClick={ onClickHandler }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-meal-btn"
        name="meal"
        onClick={ onClickHandler }
      >
        Meals
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ onClickHandler }
      >
        Drinks
      </button>

      <br />

      {
        favoriteRecipes.length > 0 ? (
          renderFavoriteRecipes()
        ) : (
          <span>Não há receitas favoritadas</span>
        )
      }
    </div>
  );
}

export default FavoriteRecipes;
