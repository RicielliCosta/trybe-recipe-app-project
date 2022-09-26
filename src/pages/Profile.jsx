import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

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
    </div>
  );
}

export default Profile;
