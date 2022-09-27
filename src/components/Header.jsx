import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import '../css/Header.css';
import RecipesContext from '../context/RecipesContext';
import SearchBar from './SearchBar';

function Header() {
  const {
    pageTitle,
    showSearchButton,
  } = useContext(RecipesContext);

  const [showSearchInput, setShowSearchInput] = useState(false);

  const onClickSearchButton = () => {
    setShowSearchInput((prevState) => !prevState);
  };

  return (
    <header>
      <span data-testid="page-title" className="test">{ pageTitle }</span>
      <Link to="/profile">
        <button
          type="button"
          data-testid="profile-top-btn"
          className="profile-logo"
          src={ ProfileIcon }
        >
          Perfil
        </button>
      </Link>

      {
        showSearchButton && (
          <button
            type="button"
            data-testid="search-top-btn"
            className="search-logo"
            src={ SearchIcon }
            onClick={ onClickSearchButton }
          >
            Search
          </button>
        )
      }

      {
        showSearchInput && (
          <SearchBar />
        )
      }
    </header>
  );
}

export default Header;
