import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';
import mockFetch from './mocks/mockFetch';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { favoriteMealRecipes, favoriteDrinkRecipes } from './mocks/storageDefault';

// Código para mockar clipboard
// Source: https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest

const testMeal = '/meals/52771';
const testDrink = '/drinks/178319';
const favoriteIconId = 'favorite-icon';
const originalClipboard = { ...global.navigator.clipboard };
const mockClipboard = {
  writeText: jest.fn(),
};

afterEach(() => {
  global.fetch.mockClear();
  global.navigator.clipboard = originalClipboard;
});

const flushPromises = () => new Promise((r) => { setTimeout(r); });

describe('Testar detalhes da comida e botão /start recipe/', () => {
  beforeEach(() => {
    const mockMultFetch = jest.fn()
      .mockReturnValueOnce(mockFetch(oneMeal))
      .mockReturnValueOnce(mockFetch(drinks))
      .mockReturnValue(mockClipboard);
    global.fetch = mockMultFetch;
  });
  test('Teste se fetch é chamada e dados são exibidos', async () => {
    await flushPromises();
    renderPath(testMeal);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle).toHaveTextContent(oneMeal.meals[0].strMeal);
    const ingredients = screen.queryAllByTestId(/ingredient-name-and-measure/i);
    expect(ingredients).toHaveLength(8);
  });
  test('Teste se comida é compartilhada e usuário é redirecionado para tela de receita em andamento', async () => {
    await flushPromises();
    renderPath(testMeal);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const shareButton = screen.getByTestId('share-btn');
    window.document.execCommand = jest.fn().mockImplementation(() => ' ');
    userEvent.click(shareButton);
    const linkCopied = screen.getByText('Link copied!');
    expect(linkCopied).toBeInTheDocument();
    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);
    expect(window.location.pathname).toBe('/meals/52771/in-progress');
  });
  test('Teste se comida é favoritada quando clica no botão', async () => {
    await flushPromises();
    renderPath(testMeal);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const favoriteButton = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteButton);
    const favoriteImages = screen.queryAllByRole('img');
    const favoriteImage = favoriteImages
      .find((image) => image.getAttribute('alt') === favoriteIconId);
    expect(favoriteImage).toHaveAttribute('src', blackHeartIcon);
  });
});

describe('Testar se a comida vem favoritada', () => {
  beforeEach(() => {
    const mockMultFetch = jest.fn()
      .mockReturnValueOnce(mockFetch(oneMeal))
      .mockReturnValue(mockFetch(drinks));
    global.fetch = mockMultFetch;
  });
  test('Teste se a comida vem favoritada', async () => {
    await flushPromises();
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteMealRecipes));
    renderPath(testMeal);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const favoriteImages = screen.queryAllByRole('img');
    const favoriteImage = favoriteImages
      .find((image) => image.getAttribute('alt') === favoriteIconId);
    expect(favoriteImage).toHaveAttribute('src', blackHeartIcon);
  });
});

describe('Testar detalhes da bebida', () => {
  beforeEach(() => {
    const mockMultFetch = jest.fn()
      .mockReturnValueOnce(mockFetch(oneDrink))
      .mockReturnValueOnce(mockFetch(meals))
      .mockReturnValue(mockClipboard);
    global.fetch = mockMultFetch;
  });
  test('Teste se fetch é chamada e dados são exibidos', async () => {
    await flushPromises();
    renderPath(testDrink);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle).toHaveTextContent(oneDrink.drinks[0].strDrink);
    const ingredients = screen.queryAllByTestId(/ingredient-name-and-measure/i);
    expect(ingredients).toHaveLength(7);
  });
  test('Teste se bebida é compartilhada e usuário é redirecionado para tela de receita em andamento', async () => {
    await flushPromises();
    renderPath(testDrink);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const shareButton = screen.getByTestId('share-btn');
    window.document.execCommand = jest.fn().mockImplementation(() => ' ');
    userEvent.click(shareButton);
    const linkCopied = screen.getByText('Link copied!');
    expect(linkCopied).toBeInTheDocument();
    userEvent.click(shareButton);
    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);
    expect(window.location.pathname).toBe('/drinks/178319/in-progress');
  });
  test('Teste se bebida é favoritada ao clicar no botão', async () => {
    await flushPromises();
    renderPath(testDrink);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const favoriteButton = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteButton);
    const favoriteImages = screen.queryAllByRole('img');
    const favoriteImage = favoriteImages
      .find((image) => image.getAttribute('alt') === favoriteIconId);
    expect(favoriteImage).toHaveAttribute('src', blackHeartIcon);
  });
});

describe('Testar se a bebida vem favoritada', () => {
  beforeEach(() => {
    const mockMultFetch = jest.fn()
      .mockReturnValueOnce(mockFetch(oneDrink))
      .mockReturnValue(mockFetch(meals));
    global.fetch = mockMultFetch;
  });
  test('Teste se a comida vem favoritada', async () => {
    await flushPromises();
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteDrinkRecipes));
    renderPath(testDrink);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const favoriteImages = screen.queryAllByRole('img');
    const favoriteImage = favoriteImages
      .find((image) => image.getAttribute('alt') === favoriteIconId);
    expect(favoriteImage).toHaveAttribute('src', blackHeartIcon);
  });
});
