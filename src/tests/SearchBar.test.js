import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import storageDefault from './mocks/storageDefault';
import renderPath from './helpers/renderPath';
import mockFetch from '../tests/mocks/mockFetch';
import mealsData from '../tests/mocks/mealsData';

const { meals } = mealsData;

describe('Testar se SearchPage renderiza com todos os elementos', () => {
  beforeEach(() => {
    localStorage.setItem('user', storageDefault.user);
  });
  afterEach(() => localStorage.clear());

  test('Testa se SearchPage alterna renderização dos elementos quando botão de pesquisa é clicado', () => {
    renderPath('/meals');

    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();
    const nameRadio = screen.getByTestId('name-search-radio');
    expect(nameRadio).toBeInTheDocument();
    const letterRadio = screen.getByTestId('first-letter-search-radio');
    expect(letterRadio).toBeInTheDocument();
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();
  });
  test('Testa se fetch é chamada para busca de ingredientes em receitas de comidas', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    renderPath('/meals');

    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);
    const nameRadio = screen.getByTestId('name-search-radio');
    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    const letterRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(letterRadio);
    expect(letterRadio).toBeChecked();
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientRadio);
    expect(ingredientRadio).toBeChecked();
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'sugar');
    expect(searchInput).toHaveValue('sugar');
    const execSearchButton = screen.getByTestId('exec-search-btn');
    userEvent.click(execSearchButton);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    // const nameRadio = screen.getByTestId('name-search-radio');
    // const letterRadio = screen.getByTestId('first-letter-search-radio');
    global.fetch.mockClear();
  });
  test('Testa se fetch é chamada para busca de nomes em receitas de bebidas', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    renderPath('/drinks');

    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);
    const nameRadio = screen.getByTestId('name-search-radio');
    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'gim');
    expect(searchInput).toHaveValue('gim');
    const execSearchButton = screen.getByTestId('exec-search-btn');
    userEvent.click(execSearchButton);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    global.fetch.mockClear();
  });
});
