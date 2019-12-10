import React, { Component } from 'react';
import axios from 'axios';

class GameShowPage extends Component{
	constructor(props){
		super(props)

		this.state ={
			
		}
	}

	componentDidMount(){
		this.getGameIdAndSearch(this.props.location.state.sentGame.gameId);
	}
	
	getGameIdAndSearch = (id) =>{
		console.log(id, "Hey you got the game ID");
		const searchUrl = `https://api.rawg.io/api/games/${id}`;
		axios.get(searchUrl, {
			headers: {
				'Content-Type' : 'application/json'
			}
		}).then(response =>{
			console.log(response.data, "Hey look at this guy")
			this.setState({
				gameTitle: response.data.name, 
				developers: response.data.developers,
				publishers: response.data.publishers,
				image: response.data.background_image,
				gameDescription: response.data.description,
				ratings: response.data.ratings
			})
		})
	}

	render(){
		return(
			<div>
				
			</div>
		)
	}
}

export default GameShowPage;