/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/RecipesInProgress.css';

function DrinksDetail() {
  const [copySource, setCopySource] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const { responseIdRecipe, recomendedRecipes,
    recipesInProgress, setFinishRecipeButtonDisabled } = useContext(RecipesContext);
  const {
    strDrinkThumb, strDrink, strInstructions, strAlcoholic, idDrink, strCategory,
  } = responseIdRecipe;
  const allValues = Object.entries(responseIdRecipe);

  const ingredients = [];
  allValues.filter((item) => item[0].includes('Ingredient'))
    .filter((item) => item[1] !== null && item[1] !== '')
    .forEach((item) => ingredients.push(item[1]));

  const measures = [];
  allValues.filter((item) => item[0].includes('Measure'))
    .filter((item) => item[1] !== null && item[1] !== '')
    .forEach((item) => measures.push(item[1]));

  const gatheringIngredientsAndMeasures = ingredients.map((ingredient, i) => measures
    .map((measure, index) => {
      if (i === index) {
        const both = ` ${ingredient} - ${measure}`;
        return both;
      }

      return '';
    }));

  const ingredientsAndMeasures = [];
  gatheringIngredientsAndMeasures.forEach((one) => {
    ingredientsAndMeasures.push(one.filter((item) => item !== ''));
  });

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      setIsFavorite(favoriteRecipes.some((item) => item.id === idDrink));
    }
    // const ingredientsSavedStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // if (ingredientsSavedStorage !== null) {
    //   setIsChecked(ingredientsSavedStorage.drinks[idDrink]);
    //   console.log(isChecked);
    // }
  }, [idDrink]);

  useEffect(() => {
    if (isChecked.length === ingredientsAndMeasures.length) {
      setFinishRecipeButtonDisabled(false);
    } else {
      setFinishRecipeButtonDisabled(true);
    }
    const objToSaveStorage = { [idDrink]: isChecked };
    const ingredientsSavedStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const drinks = { ...ingredientsSavedStorage, drinks: objToSaveStorage };
    if (isChecked.length > 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(drinks));
    }
  }, [isChecked]);

  // useEffect(() => () => {
  //   const objToSaveStorage = { [idDrink]: isChecked };
  //   const ingredientsSavedStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   const drinks = { ...ingredientsSavedStorage, drinks: objToSaveStorage };
  //   localStorage.setItem('inProgressRecipes', JSON.stringify(drinks));
  // }, []);

  const onClickShareButton = () => {
    setCopySource(true);
    copy(`http://localhost:3000/drinks/${idDrink}`);
  };

  const onClickFavoriteButton = () => {
    setIsFavorite((prevState) => !prevState);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const obj = {
      alcoholicOrNot: strAlcoholic,
      category: strCategory,
      id: idDrink,
      image: strDrinkThumb,
      name: strDrink,
      nationality: '',
      type: 'drink',
    };

    if (favoriteRecipes !== null) {
      const alreadyFavorite = favoriteRecipes.some((item) => item.id === idDrink);

      if (alreadyFavorite) {
        const newFavorites = favoriteRecipes.filter((item) => item.id !== idDrink);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      }
      if (!alreadyFavorite) {
        const favorites = JSON.stringify([...favoriteRecipes, obj]);
        localStorage.setItem('favoriteRecipes', favorites);
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
    }
  };

  const handleChange = (target) => {
    const { name, checked } = target;
    if (checked) {
      setIsChecked([...isChecked, name]);
    } else {
      const newCheked = [...isChecked];
      setIsChecked(newCheked.filter((check) => check !== name));
    }
  };

  return (
    <div>
      <h3 data-testid="recipe-title">{ strDrink }</h3>

      {
        isFavorite ? (
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ onClickFavoriteButton }
            src={ blackHeartIcon }
          >

            <img
              src={ blackHeartIcon }
              alt="favorite-icon"
            />
          </button>
        ) : (
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ onClickFavoriteButton }
            src={ whiteHeartIcon }
          >
            <img
              src={ whiteHeartIcon }
              alt="favorite-icon"
            />
          </button>
        )
      }

      <button
        type="button"
        data-testid="share-btn"
        onClick={ onClickShareButton }
      >
        <img
          src={ shareIcon }
          alt="compartilhar"
        />
      </button>
      { copySource && <span>Link copied!</span> }
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        width="100px"
        data-testid="recipe-photo"
      />

      <span data-testid="recipe-category">{ strAlcoholic }</span>

      {
        recipesInProgress ? (
          ingredientsAndMeasures.map((item, index) => (
            <li key={ index } className="ingredient-li">
              <label
                htmlFor={ index }
                data-testid={ `${index}-ingredient-step` }
                className={ isChecked.some((elemen) => elemen
                  .includes(item)) ? 'recipeInProgressChecked' : '' }
              >
                <input
                  type="checkbox"
                  id={ index }
                  name={ item }
                  checked={ isChecked.some((elemen) => elemen.includes(item)) }
                  onChange={ (event) => handleChange(event.target) }
                />
                { item }
              </label>

            </li>
          ))
        ) : (
          <ul>
            { ingredientsAndMeasures.map((item, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { item }
              </li>
            )) }
          </ul>
        )
      }

      <p data-testid="instructions">{ strInstructions }</p>

      <span>Recomended recipes:</span>
      <div className="recomended-recipes">
        {
          recomendedRecipes.map((item, index) => {
            const { strMealThumb, strMeal } = item;
            const limitSize = 6;
            if (index < limitSize) {
              return (

                <div
                  key={ index }
                  data-testid={ `${index}-recommendation-card` }
                >
                  <img
                    src={ strMealThumb }
                    alt={ strMeal }
                    width="100px"
                  />

                  <span data-testid={ `${index}-recommendation-title` }>
                    { strMeal }
                  </span>
                </div>
              );
            }
            return '';
          })
        }
      </div>
    </div>
  );
}

export default DrinksDetail;
