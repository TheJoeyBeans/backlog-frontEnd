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
			if(game.playing === true){
			return(
				<li key={i}><img className='backlogIcon' src='https://static.thenounproject.com/png/138425-200.png'/>{game.title}</li>
			)
		} else {
			return(
				<li key={i}>{game.title}</li>
			)
		}
		})
		return(
			<div className='homeBackLogList'>
				<h4>Your Current Backlog:</h4>
				<ul>
					{backlogItem}
					{recentItem}
				</ul>
			</div>
		)
	}
}

export default MainPageBacklogList;