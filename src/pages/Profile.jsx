/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';

function Profile({ history: { push } }) {
  const { setShowSearchButton, setPageTitle } = useContext(RecipesContext);
  const { email } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setShowSearchButton(false);
    setPageTitle('Profile');
  }, []);

  const onClickLogoutButton = () => {
    localStorage.clear();
    push('/');
  };

  return (
    <div>
      <Header />
      <div>
        <h2>Profile Page</h2>
        <span data-testid="profile-email">{ email }</span>

        <button
          type="button"
          onClick={ () => push('/done-recipes') }
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>

        <button
          type="button"
          onClick={ () => push('/favorite-recipes') }
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>

        <button
          type="button"
          onClick={ onClickLogoutButton }
          data-testid="profile-logout-btn"
        >
          Logout
        </button>

      </div>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,
};

export default Profile;
