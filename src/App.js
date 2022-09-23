import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Meals from './components/Meals';

function App() {
  return (
    <div>
      <h1>App de receitas</h1>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
