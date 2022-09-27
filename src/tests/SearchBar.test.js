import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import storageDefault from './mocks/storageDefault';
import renderPath from './helpers/renderPath';
import mockFetch from './mocks/mockFetch';
// import mealsData from './mocks/mealsData';

// const { meals } = mealsData;
const inputSearchId = 'search-input';
const nameSearchId = 'name-search-radio';
const ingredientSearchId = 'ingredient-search-radio';
const firstLetterId = 'first-letter-search-radio';
const execSearchButtonId = 'exec-search-btn';
const searchButtonId = 'search-top-btn';

describe('Testar se SearchPage renderiza com todos os elementos', () => {
  beforeEach(() => {
    localStorage.setItem('user', storageDefault.user);
  });
  afterEach(() => localStorage.clear());

  test('Testa se SearchPage alterna renderização dos elementos quando botão de pesquisa é clicado', () => {
    renderPath('/meals');

    const searchButton = screen.getByTestId(searchButtonId);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);
    const ingredientRadio = screen.getByTestId(ingredientSearchId);
    expect(ingredientRadio).toBeInTheDocument();
    const nameRadio = screen.getByTestId(nameSearchId);
    expect(nameRadio).toBeInTheDocument();
    const letterRadio = screen.getByTestId(firstLetterId);
    expect(letterRadio).toBeInTheDocument();
    const searchInput = screen.getByTestId(inputSearchId);
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();
  });
});

describe('Testar chamadas às API', () => {
  test('Testa se fetch é chamada para busca de ingredientes em receitas de comidas', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    renderPath('/meals');

    const searchButton = screen.getByTestId(searchButtonId);
    userEvent.click(searchButton);
    const nameRadio = screen.getByTestId(nameSearchId);
    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    const letterRadio = screen.getByTestId(firstLetterId);
    userEvent.click(letterRadio);
    expect(letterRadio).toBeChecked();
    const ingredientRadio = screen.getByTestId(ingredientSearchId);
    userEvent.click(ingredientRadio);
    expect(ingredientRadio).toBeChecked();
    const searchInput = screen.getByTestId(inputSearchId);
    userEvent.type(searchInput, 'sugar');
    expect(searchInput).toHaveValue('sugar');
    const execSearchButton = screen.getByTestId(execSearchButtonId);
    userEvent.click(execSearchButton);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    global.fetch.mockClear();
  });
  test('Testa se fetch é chamada para busca de nomes em receitas de bebidas', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    renderPath('/drinks');

    const searchButton = screen.getByTestId(searchButtonId);
    userEvent.click(searchButton);
    const nameRadio = screen.getByTestId(nameSearchId);
    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    const searchInput = screen.getByTestId(inputSearchId);
    userEvent.type(searchInput, 'gim');
    expect(searchInput).toHaveValue('gim');
    const execSearchButton = screen.getByTestId(execSearchButtonId);
    userEvent.click(execSearchButton);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    global.fetch.mockClear();
  });
});
