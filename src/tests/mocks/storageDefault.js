const mealName = 'Spicy Arrabiata Penne';
const mealLink = 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg';
const drinkLink = 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg';
const drinkName = 'Aquamarine';

export const storageDefault = {
  user: { email: 'email@test.com' },
  mealsToken: '1',
  drinksToken: '1',
};

export const favoriteMealRecipes = [{
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: mealName,
  image: mealLink,
}];

export const favoriteDrinkRecipes = [{
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: drinkName,
  image: drinkLink,
}];

export const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: mealName,
    image: mealLink,
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: drinkName,
    image: drinkLink,
    doneDate: '23/06/2020',
    tags: [],
  },
];

export const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: mealName,
    image: mealLink,
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: drinkName,
    image: drinkLink,
  },
];
