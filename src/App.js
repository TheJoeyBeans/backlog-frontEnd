import React, { Component } from 'react';
import HomePage from './HomePage';
import BacklogPage from './BacklogPage';
import CompletedGames from './CompletedGames';
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component{
	constructor(){
		super();

		this.state={

		}
	}
	render(){
	  return (
	    <main>
	    <Switch>
	   		<Route exact path='/' component={ HomePage }/>
	   		<Route exact path='/backlog' component={ BacklogPage }/>
	   		<Route exact path='/completedGames' component= { CompletedGames }/>
	   		<Route exact path='/registration' component={ RegistrationPage }/>
	   		<Route exact path='/login' component={ LoginPage }/>
	     </Switch>
	    </main>
	  );
}
}

export default App;

