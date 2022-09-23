import React, { useState, useEffect } from 'react';

function Login() {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [login, setLogin] = useState({ email: '', password: '' });

  const inputHandler = ({ target }) => {
    setLogin((prevState) => ({ ...prevState, [target.name]: target.value }));
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
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
