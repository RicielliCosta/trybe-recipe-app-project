/* eslint-disable react-hooks/exhaustive-deps */
import propTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function Profile({ history: { push } }) {
  const { setShowSearchButton, setPageTitle } = useContext(RecipesContext);
  const userEmail = JSON.parse(localStorage.getItem('user'));
  let email;

  if (userEmail) {
    email = userEmail.email;
  } else {
    email = '';
  }

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
