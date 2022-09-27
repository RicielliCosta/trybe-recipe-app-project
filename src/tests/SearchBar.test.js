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

const clickSearch = () => {
  const searchButton = screen.getByTestId(searchButtonId);
  expect(searchButton).toBeInTheDocument();
  userEvent.click(searchButton);
};

const getElements = () => {
  const ingredientRadio = screen.getByTestId(ingredientSearchId);
  const nameRadio = screen.getByTestId(nameSearchId);
  const letterRadio = screen.getByTestId(firstLetterId);
  const searchInput = screen.getByTestId(inputSearchId);
  const execSearchButton = screen.getByTestId(execSearchButtonId);
  return {
    ingredientRadio,
    nameRadio,
    letterRadio,
    searchInput,
    execSearchButton };
};

describe('Testar se SearchPage renderiza com todos os elementos', () => {
  beforeEach(() => {
    localStorage.setItem('user', storageDefault.user);
  });
  afterEach(() => localStorage.clear());

  test('Testa se SearchPage alterna renderização dos elementos quando botão de pesquisa é clicado', () => {
    renderPath('/meals');
    clickSearch();
    const {
      ingredientRadio, nameRadio,
      letterRadio, searchInput,
    } = getElements();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(letterRadio).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    clickSearch();
    expect(searchInput).not.toBeInTheDocument();
  });
});

describe('Testar chamadas às API', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });
  afterEach(() => global.fetch.mockClear());
  test('Testa se fetch é chamada para busca de ingredientes em receitas de comidas', async () => {
    renderPath('/meals');
    clickSearch();
    const {
      ingredientRadio, nameRadio,
      letterRadio, searchInput, execSearchButton,
    } = getElements();
    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    userEvent.click(letterRadio);
    expect(letterRadio).toBeChecked();
    userEvent.click(ingredientRadio);
    expect(ingredientRadio).toBeChecked();
    userEvent.type(searchInput, 'sugar');
    expect(searchInput).toHaveValue('sugar');
    userEvent.click(execSearchButton);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
  test('Testa se fetch é chamada para busca de nomes em receitas de bebidas', async () => {
    renderPath('/drinks');
    clickSearch();
    const {
      nameRadio, searchInput, execSearchButton,
    } = getElements();
    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    userEvent.type(searchInput, 'gim');
    userEvent.click(execSearchButton);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
  test('Testa se fetch é chamada para busca por primeira letra', async () => {
    jest.spyOn(global, 'alert');
    renderPath('/meals');
    clickSearch();
    const {
      letterRadio, searchInput, execSearchButton,
    } = getElements();
    userEvent.click(letterRadio);
    userEvent.type(searchInput, 'xx');
    userEvent.click(execSearchButton);
    expect(global.alert).toHaveBeenCalled();
    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'x');
    userEvent.click(execSearchButton);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
});
