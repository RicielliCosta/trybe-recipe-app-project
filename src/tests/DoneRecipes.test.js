import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { doneMealRecipes, doneDrinkRecipes } from './mocks/storageDefault';
import renderPath from './helpers/renderPath';

describe('Testar se a página renderiza os elementos, e comportamento de botões', () => {
  test('Testa se botões de filtro e elementos da receita são renderizados', () => {
    localStorage.removeItem('doneRecipes');
    localStorage.setItem('doneRecipes', JSON.stringify(doneMealRecipes));
    renderPath('/done-recipes');
    const filterAllButton = screen.getByTestId('filter-by-all-btn');
    expect(filterAllButton).toBeInTheDocument();
    const recipeImage = screen.getByTestId('0-horizontal-image');
    expect(recipeImage).toBeInTheDocument();
  });
  test('Testa se copia a URL dos detalhes da receita se o botão de compartilhar é clicado', () => {
    localStorage.removeItem('doneRecipes');
    localStorage.setItem('doneRecipes', JSON.stringify(doneMealRecipes));
    renderPath('/done-recipes');
    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();
    userEvent.click(shareButton);
  });
});
