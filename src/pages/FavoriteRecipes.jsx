/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const { setShowSearchButton, setPageTitle } = useContext(RecipesContext);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [copySource, setCopySource] = useState(false);

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
    // localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorites));
  }, []);

  const onClickHandler = ({ target: { name } }) => {
    const favoriteRecipesLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (name === 'all') {
      setFavoriteRecipes(favoriteRecipesLS);
    }
    if (name === 'meal') {
      setFavoriteRecipes(favoriteRecipesLS.filter((item) => item.type === name));
    }
    if (name === 'drink') {
      setFavoriteRecipes(favoriteRecipesLS.filter((item) => item.type === name));
    }
  };

  const onClickFavoriteButton = (id) => {
    const newFavorites = favoriteRecipes.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavoriteRecipes(newFavorites);
  };

  const onClickShareButton = (type, id) => {
    setCopySource(true);
    copy(`http://localhost:3000/${type}s/${id}`);
  };

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
            onClick={ () => onClickFavoriteButton(id) }
            src={ blackHeartIcon }
          >

            <img
              src={ blackHeartIcon }
              alt="favorite-icon"
            />
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

      { copySource && <span>Link copied!</span>}

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
