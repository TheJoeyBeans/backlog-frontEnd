import React from 'react';
import HomePage from './HomePage';
import BacklogPage from './BacklogPage';
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <main>
    <Switch>
   		<Route exact path='/' component={ HomePage }/>
   		<Route exact path='/backlog' component={ BacklogPage }/>
   		<Route exact path='/registration' component={ RegistrationPage }/>
   		<Route exact path='/login' component={ LoginPage }/>
     </Switch>
    </main>
  );
}

export default App;
