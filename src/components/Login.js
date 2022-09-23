import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

function Login(props) {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [login, setLogin] = useState({ email: '', password: '' });

  const inputHandler = ({ target }) => {
    setLogin((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const onClickLoginButton = (event) => {
    event.preventDefault();
    const user = JSON.stringify({ email: login.email });
    localStorage.setItem('user', user);
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('drinksToken', '1');
    const { history: { push } } = props;
    push('/meals');
  };

  useEffect(() => {
    const passwordMinLength = 7;
    const validator = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const enabledButton = login.password.length >= passwordMinLength
      && validator.test(login.email)
      && login.email.length > 0;
    setButtonDisabled(!enabledButton);
  }, [login]);

  return (
    <div>
      <form>
        <label htmlFor="email-input">
          <span>Email: </span>
          <input
            type="email"
            data-testid="email-input"
            id="email-input"
            name="email"
            onChange={ inputHandler }
            value={ login.email }
          />
        </label>

        <label htmlFor="password input">
          <span>Senha: </span>
          <input
            type="password"
            data-testid="password-input"
            id="password-input"
            name="password"
            onChange={ inputHandler }
            value={ login.password }
          />
        </label>

        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ buttonDisabled }
          onClick={ onClickLoginButton }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,
};

export default Login;
