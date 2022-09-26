import React, { useContext } from 'react';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import '../css/Header.css';
import RecipesContext from '../context/RecipesContext';

function Header() {
  const {
    pageTitle,
    showSearchButton,
  } = useContext(RecipesContext);

  return (
    <header>
      <span data-testid="page-title" className="test">{ pageTitle }</span>
      <button
        type="button"
        data-testid="profile-top-btn"
        className="profile-logo"
        src={ ProfileIcon }
      >
        Perfil
      </button>

      {
        showSearchButton && (
          <button
            type="button"
            data-testid="search-top-btn"
            className="search-logo"
            src={ SearchIcon }
          >
            Search
          </button>
        )
      }
    </header>
  );
}

export default Header;
