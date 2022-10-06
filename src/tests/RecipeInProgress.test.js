import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import renderPath from './helpers/renderPath';
import mockFetch from './mocks/mockFetch';

const routeMeals = '/meals/52771/in-progress';
const routeDrinks = '/drinks/178319/in-progress';

describe('Testar se os dados da comida em andamento são exibidos', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch(oneMeal));
    localStorage.removeItem('inProgressRecipes');
  });

  afterEach(() => global.fetch.mockClear());

  test('Teste se receita de comida é buscada na API e renderizada', async () => {
    renderPath(routeMeals);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle).toHaveTextContent(oneMeal.meals[0].strMeal);
    const ingredients = screen.queryAllByTestId(/ingredient-step/i);
    expect(ingredients).toHaveLength(8);
  });
  test('Testa comportamento dos botões compartilhar/finalizar receitas', async () => {
    renderPath(routeMeals);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const shareButton = screen.getByTestId('share-btn');
    window.document.execCommand = jest.fn().mockImplementation(() => ' ');
    userEvent.click(shareButton);
    const linkText = screen.getByText('Link copied!');
    expect(linkText).toBeInTheDocument();
    const ingredientCheckbox = screen.queryAllByRole('checkbox');
    ingredientCheckbox.forEach((checkbox) => userEvent.click(checkbox));
    const finishRecipeButton = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipeButton).not.toBeDisabled();
    userEvent.click(finishRecipeButton);
    expect(window.location.pathname).toBe('/done-recipes');
  });
  test('Teste se checkbox de ingredients pode ser marcado/desmarcado', async () => {
    renderPath(routeMeals);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const ingredientCheckbox = screen.queryAllByRole('checkbox');
    const ingredientLabels = screen.queryAllByTestId(/-ingredient-step/i);
    expect(ingredientCheckbox[0]).not.toBeChecked();
    expect(ingredientLabels[0]).not.toHaveClass('recipeInProgressChecked');
    userEvent.click(ingredientCheckbox[0]);
    expect(ingredientCheckbox[0]).toBeChecked();
    expect(ingredientLabels[0]).toHaveClass('recipeInProgressChecked');
    userEvent.click(ingredientCheckbox[0]);
    expect(ingredientCheckbox[0]).not.toBeChecked();
    expect(ingredientLabels[0]).not.toHaveClass('recipeInProgressChecked');
  });
});

describe('Testar se os dados da bebida em andamento são exibidos', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch(oneDrink));
    localStorage.removeItem('inProgressRecipes');
  });

  test('Teste se receita de bebida é buscada na API e renderizada', async () => {
    renderPath(routeDrinks);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle).toHaveTextContent(oneDrink.drinks[0].strDrink);
    const ingredients = screen.queryAllByTestId(/ingredient-step/i);
    expect(ingredients).toHaveLength(3);
  });
  test('Teste funcionamento de botões compartilhar/finalizar receita', async () => {
    renderPath(routeDrinks);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const shareButton = screen.getByTestId('share-btn');
    window.document.execCommand = jest.fn().mockImplementation(() => ' ');
    userEvent.click(shareButton);
    const linkText = screen.getByText('Link copied!');
    expect(linkText).toBeInTheDocument();
    const ingredientCheckbox = screen.queryAllByRole('checkbox');
    ingredientCheckbox.forEach((checkbox) => userEvent.click(checkbox));
    const finishRecipeButton = screen.getByTestId('finish-recipe-btn');
    userEvent.click(finishRecipeButton);
    expect(window.location.pathname).toBe('/done-recipes');
  });
  test('Teste se checkbox de ingredients pode ser marcado/desmarcado', async () => {
    renderPath(routeDrinks);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const ingredientCheckbox = screen.queryAllByRole('checkbox');
    const ingredientLabels = screen.queryAllByTestId(/-ingredient-step/i);
    expect(ingredientCheckbox[0]).not.toBeChecked();
    expect(ingredientLabels[0]).not.toHaveClass('recipeInProgressChecked');
    userEvent.click(ingredientCheckbox[0]);
    expect(ingredientCheckbox[0]).toBeChecked();
    expect(ingredientLabels[0]).toHaveClass('recipeInProgressChecked');
    userEvent.click(ingredientCheckbox[0]);
    expect(ingredientCheckbox[0]).not.toBeChecked();
    expect(ingredientLabels[0]).not.toHaveClass('recipeInProgressChecked');
  });
});
