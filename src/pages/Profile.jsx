/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';

function Profile() {
  const { setShowSearchButton, setPageTitle } = useContext(RecipesContext);

  useEffect(() => {
    setShowSearchButton(false);
    setPageTitle('Profile');
  }, []);

  return (
    <div>
      <Header />
      Profile
      <Footer />
    </div>
  );
}

export default Profile;
