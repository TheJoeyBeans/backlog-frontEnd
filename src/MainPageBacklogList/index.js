import React, { Component } from 'react';
import axios from 'axios';

class MainPageBacklogList extends Component{
	constructor(props){
		super(props)

		this.state = {
			backlog: [],
			recentlyAdded: []
		}
	}

	componentDidMount(){
		this.getUserBackLog();
	}

	getUserBackLog = async () =>{
		try{
			const games = await fetch(`${process.env.REACT_APP_API_URL}/game/`, {
				credentials: 'include',
				method: 'GET'
			});
			const parsedGames = await games.json();
			this.setState({
				backlog: parsedGames.backlogGames
			})
			this.props.getBackLog(this.state.backlog);
		} catch(err){
			console.log(err)
		}
	}

	render(){
		const recentItem = this.props.recentGames.map((game, i) =>{
			return(
				<li key={i}>{game}</li>
			)
		})
		const backlogItem = this.state.backlog.map((game, i) =>{
			return(
				<li key={i}>{game.title}</li>
			)
		})
		return(
			<div>
				<h4>Currently in your backlog:</h4>
				<ul>
					{backlogItem}
					{recentItem}
				</ul>
			</div>
		)
	}
}

export default MainPageBacklogList;