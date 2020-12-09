import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Home from './containers/Home/Home';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Perfil from './containers/Perfil/Perfil';
import Admin from './containers/Admin/Admin';

import './App.scss';

function App() {

  //const [user, setUser]= useState(JSON.parse(localStorage.getItem('user')));



  return (
    <BrowserRouter>
      <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/register' component={Register} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/perfil' component={Perfil} exact/>
          <Route path='/admin' component={Admin} exact/>
      </Switch>
    </BrowserRouter>
   
  );
}

export default App;
