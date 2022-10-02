/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copySource, setCopySource] = useState(false);
  const { setShowSearchButton, setPageTitle } = useContext(RecipesContext);

  const getDoneRecipes = () => {
    const doneRecipesLS = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesLS !== null) {
      setDoneRecipes(doneRecipesLS);
    }
  };

  const onClickShareButton = (type, id) => {
    setCopySource(true);
    copy(`http://localhost:3000/${type}s/${id}`);
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

  const renderDoneRecipes = () => {
    const result = doneRecipes.map((item, index) => {
      const {
        alcoholicOrNot, category, doneDate, image, name, nationality, tags, type, id,
      } = item;
      return (
        <div key={ index }>
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
          {
            tags.length > 0 && (
              <div>
                { tags.map((tag, i) => (
                  <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
                    { tag }
                  </p>
                ))}
              </div>
            )
          }
        </div>
      );
    });
    return result;
  };

  useEffect(() => {
    setShowSearchButton(false);
    setPageTitle('Done Recipes');
    getDoneRecipes();
  }, []);

  return (
    <div>
      <Header />
      <div>

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

        { copySource && (
          <div>
            <span>Link copied!</span>
          </div>
        )}

        {
          doneRecipes.length > 0 ? (
            renderDoneRecipes()
          ) : (
            <span>Não há receitas prontas</span>
          )
        }

      </div>
    </div>
  );
}

export default DoneRecipes;
