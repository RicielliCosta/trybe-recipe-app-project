import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="text-search-input">
        <span>Busca: </span>
        <input
          type="text"
          data-testid="search-input"
          id="text-search-input"
        />
      </label>

      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          name="search-radio"
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          name="search-radio"
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          name="search-radio"
          data-testid="first-letter-search-radio"
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}
export default SearchBar;
