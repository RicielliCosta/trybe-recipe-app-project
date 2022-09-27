import React from 'react';
import '../css/Footer.css';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <Link to="/meals">
        <img
          src={ mealIcon }
          alt="drink-icon"
          data-testid="meals-bottom-btn"
          className="drink-icon"
        />
      </Link>

      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="drink-icon"
          data-testid="drinks-bottom-btn"
          className="meal-icon"
        />
      </Link>
    </footer>
  );
}

export default Footer;
