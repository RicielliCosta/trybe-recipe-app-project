const mealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const mealsCategoriesURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const drinkCategoriesURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const requestMealsRecipes = async () => {
  try {
    const data = await fetch(mealsURL);
    const json = await data.json();
    return json;
  } catch (error) {
    return error;
  }
};

export const requestDrinksRecipes = async () => {
  try {
    const data = await fetch(drinksURL);
    const json = await data.json();
    return json;
  } catch (error) {
    return error;
  }
};

export const requestMealsCategories = async () => {
  try {
    const data = await fetch(mealsCategoriesURL);
    const json = await data.json();
    return json;
  } catch (error) {
    return error;
  }
};

export const requestDrinksCategories = async () => {
  try {
    const data = await fetch(drinkCategoriesURL);
    const json = await data.json();
    return json;
  } catch (error) {
    return error;
  }
};
