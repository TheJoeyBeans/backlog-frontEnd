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
			addToBacklog: ''
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
	getGameIdAndSearch = (id) =>{
		console.log(id, "Hey you got the game ID");
		const searchUrl = `https://api.rawg.io/api/games/${id}`;
		axios.get(searchUrl, {
			headers: {
				'Content-Type' : 'application/json'
			}
		}).then(response =>{
			console.log(response.data, "Hey I'm the response to your dumb game")
		})
	}
	render(){
		return(
			<div>
				<SiteHeader fetchResults={this.fetchGameResults}/>
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