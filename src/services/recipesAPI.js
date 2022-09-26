const mealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

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
