import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import storageDefault from './mocks/storageDefault';
import renderPath from './helpers/renderPath';

const favoriteBtnId = 'profile-favorite-btn';
const doneRecipesBtnId = 'profile-done-btn';
const logoutBtnId = 'profile-logout-btn';

describe('Testar a página de perfil', () => {
  beforeEach(() => {
    localStorage.setItem('user', storageDefault.user);
  });
  afterEach(() => localStorage.clear());
  it('Testa se os elementos do perfil são renderizados', () => {
    renderPath('/profile');
    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    expect(profileEmail).toHaveTextContent(storageDefault.user);
    const favoriteBtn = screen.getByTestId(favoriteBtnId);
    expect(favoriteBtn).toBeInTheDocument();
    const doneRecipesBtn = screen.getByTestId(doneRecipesBtnId);
    expect(doneRecipesBtn).toBeInTheDocument();
    const logoutBtn = screen.getByTestId(logoutBtnId);
    expect(logoutBtn).toBeInTheDocument();
  });
  it('Testa se o usuário é redirecionado para tela de receitas feitas', () => {
    const { history } = renderPath('/profile');
    const doneRecipesBtn = screen.getByTestId(doneRecipesBtnId);
    expect(doneRecipesBtn).toBeInTheDocument();
    userEvent.click(doneRecipesBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Testa se o usuário é redirecionado para tela de receitas favoritas', () => {
    const { history } = renderPath('/profile');
    const favoriteBtn = screen.getByTestId(favoriteBtnId);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Testa se o usuário é redirecionado para tela de login', () => {
    const { history } = renderPath('/profile');
    const logoutBtn = screen.getByTestId(logoutBtnId);
    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);
    expect(localStorage).toHaveLength(0);
    expect(history.location.pathname).toBe('/');
  });
});
