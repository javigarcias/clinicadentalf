import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Home from './containers/Home/Home';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Perfil from './containers/Perfil/Perfil';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/register' component={Register} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/perfil' component={Perfil} exact/>
      </Switch>
    </BrowserRouter>
   
  );
}

export default App;
