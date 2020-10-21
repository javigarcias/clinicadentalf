import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Home from './containers/Home/Home';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/register' component={Register} exact/>
          <Route path='/login' component={Login} exact/>
      </Switch>
    </BrowserRouter>
   
  );
}

export default App;
