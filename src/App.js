import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Meals from './components/Meals';
// import Header from './components/Header';

function App() {
  return (
<<<<<<< HEAD
    <div>
      <h1>App de receitas</h1>
      {/* <Header /> */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          {/* <Route exact path="/drinks" component={ Meals } />
          <Route exact path={`/meals${id}` } component={ Meals } />
          <Route exact path={`/drinks${id}` } component={ Meals } />
          <Route exact path={`/meals${id}/in-progress` } component={ Meals } />
          <Route exact path={`/drinks${id}/in-progress` } component={ Meals } />
          <Route exact path="/profile" component={ Meals } />
          <Route exact path="/done-recipes" component={ Meals } />
          <Route exact path="/favorites-recipes" component={ Meals } /> */}
        </Switch>
      </BrowserRouter>
=======
    <div className="meals">
      <span className="logo">TRYBE 2.0</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
>>>>>>> origin
    </div>
  );
}

export default App;
