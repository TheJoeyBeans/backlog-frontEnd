import React, { Component } from 'react';
import SiteHeader from '../SiteHeader';
import { Row, Col, Container } from 'react-bootstrap';
import GameSearchResults from '../GameSearchResults';
import axios from 'axios';

class HomePage extends Component {
	constructor(){
		super();

		this.state = {
			foundGames: [],
			addToBacklog: {},
			userLogged: sessionStorage.getItem('userIsLogged')
		}
	}
	//When a user searchs for a game, 9 results are brought back to them. Title, picture, and id of the game are 
	//temporarly stored in state so that the gameSearchResults list can bring back a list of the responses for the user.
	//If the state already has some foundGames in them, the state is cleared. 
	fetchGameResults = (query) => {
		this.setState({
			foundGames: []
		});
		const searchUrl = `https://api.rawg.io/api/games?search=${query}&page_size=9`;
		axios.get(searchUrl, {
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response =>{
			const foundResults = response.data.results;
			console.log(foundResults);
			for(let i = 0; i < foundResults.length; i++){
				const gameTitle = foundResults[i].name;
				const gamePic = foundResults[i].background_image;
				const gameId = foundResults[i].id;

				this.setState(state=>{
					const foundGames = state.foundGames.concat({
						title: gameTitle,
						pic: gamePic,
						id: gameId
					});
					return{
						foundGames
					}
				})
			}
		})
		this.setState({
			searchQuery: ''
		})
	}
	//foundGames in the search bar will be cleared so that the user can search for another game without previous 
	//data inhibiting their ability to do so. 
	clearGameResults = () =>{
		this.setState({
			foundGames: []
		})
	}
	//Pulls game id from search results list to be used in a get request to RAWG api.
	//Runs the post request method at the end.
	getGameIdAndSearch = (id) =>{
		if(this.state.userLogged === null){
			alert('you need to be logged in to add a game to your backlog');
		} else {
			console.log(id, "Hey you got the game ID");
			const searchUrl = `https://api.rawg.io/api/games/${id}`;
			axios.get(searchUrl, {
				headers: {
					'Content-Type' : 'application/json'
				}
			}).then(response =>{
				console.log(response.data, "Hey I'm the response to your dumb game");

				this.setState({
					addToBacklog:{
						title: response.data.name,
						image: response.data.background_image,
						studio: response.data.developers[0].name,
						playing: null,
						recommended: null
					}
				})
				this.addGameToUserBacklog();
			})
		}
	}
	//Will take the addToBackLog game from state and post to to the database under the
	//correct user. 
	addGameToUserBacklog = async () => {
		const addGameUrl = `${process.env.REACT_APP_API_URL}/game/`;
		console.log(addGameUrl, "this is the gameURL");
		const postResponse = await fetch(addGameUrl, {
			method: 'POST',
			body: JSON.stringify(this.state.addToBacklog),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		console.log(postResponse, "this is the post response")
		const parsedResponse = await postResponse.json();
		console.log(parsedResponse, "this is the post game parsedResponse");
		this.setState({
			addToBacklog: {}
		})
	}
	//Will log user out of server, destory's their sessionId
	handleLogout = async (e) =>{
		try{
			const logout = await fetch(process.env.REACT_APP_API_URL + '/register/logout', {
				credentials: 'include',
				method: 'GET'
			});
			const parsedResponse = await logout
			console.log(parsedResponse, "this is your logout response");
			sessionStorage.clear();
			this.setState({
				userLogged: null
			})
			this.props.history.push('/');
		} catch(err){
			console.log(err);
		}
	}
	//Will POST a game selected as a backlog title to the database. 
	render(){
		return(
			<div>
				<SiteHeader logged={this.state.userLogged}  logout={this.handleLogout} fetchResults={this.fetchGameResults}/>
				<Row>
					<Col lg={2}>
					</Col>
					<Col md={8}>
						<GameSearchResults grabId={this.getGameIdAndSearch} gameResults={this.state.foundGames}/>
					</Col>
					<Col lg={2}>
					</Col>
				</Row>
			</div>
		)
	}
}

export default HomePage;