/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes({ match: { url } }) {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copySource, setCopySource] = useState(false);
  const { setShowSearchButton, setPageTitle } = useContext(RecipesContext);

  const getDoneRecipes = () => {
    const doneRecipesLS = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesLS !== null) {
      setDoneRecipes(doneRecipesLS);
    }
  };

  const onClickShareButton = () => {
    setCopySource(true);
    copy(`http://localhost:3000${url}`);
  };

  const renderDoneRecipes = () => {
    const result = doneRecipes.map((item, index) => {
      const {
        alcoholicOrNot, category, doneDate, image, name, nationality, tags, type,
      } = item;
      return (
        <div key={ index }>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ onClickShareButton }
            onKeyPress={ () => {} }
            tabIndex="0"
            src={ shareIcon }
          >
            <img
              src={ shareIcon }
              alt="compartilhar"
            />
          </button>

          { copySource && <span>Link copied!</span> }
          <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
            width="100px"
          />

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
    const test = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(test));
    setShowSearchButton(false);
    setPageTitle('Done Recipes');
    getDoneRecipes();
    renderDoneRecipes();
  }, []);

  return (
    <div>
      <Header />
      <div>

        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>

        <br />

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

DoneRecipes.propTypes = {
  match: propTypes.shape({ url: propTypes.string.isRequired }).isRequired,
};

export default DoneRecipes;
