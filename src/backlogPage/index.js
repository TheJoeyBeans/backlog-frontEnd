import React, { Component } from 'react';
import { Image, Row, Col, Container, Card, Button, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';

class BacklogPage extends Component{
	constructor(props){
		super(props)

		this.state={
			backlogGames: [],
			gameToUpdate:{},
			playingGames: []
		}
	}
	componentDidMount(){
		this.getUserBackLog();
	}
	//Fetches the current User's list of games in their backlog and set their list to state.
	getUserBackLog = async () =>{
		try{
			const games = await fetch(`${process.env.REACT_APP_API_URL}/game/`, {
				credentials: 'include',
				method: 'GET'
			});
			const parsedGames = await games.json();
			this.setState({
				backlogGames: parsedGames.backlogGames
			})
		} catch(err){
			console.log(err)
		}
	}
	//Removes game from User backlog and from game database. 
	deleteGame = async (id) =>{
		const deleteGameResponse = await fetch(`${process.env.REACT_APP_API_URL}/game/${id}`,{
			credentials: 'include',
			method: 'DELETE'
		});
		const deleteGameParsed = await deleteGameResponse.json();
		if (deleteGameParsed.status === 200){
			this.setState({backlogGames: this.state.backlogGames.filter((game) => game._id !== id)})
			this.setState({playingGames: this.state.playingGames.filter((game) => game._id !== id)})
		} else {
			console.log('did not delete');
		}
	}
	//Sets the game to currently playing.
	addToPlaying = async (game) =>{
		console.log(game, "gameToUpdate")
		await this.setState({
			gameToUpdate: {
				playing: true
			}
		})
		const updateGameResponse = await fetch(`${process.env.REACT_APP_API_URL}/game/${game._id}`,{
			credentials: 'include',
			body: JSON.stringify(this.state.gameToUpdate),
			method: 'PUT',
			headers: {
				'Content-Type' : 'application/json'
			}
		});
		const updatedGameParsed = await updateGameResponse.json();
		if (updatedGameParsed.status === 200){
			this.setState({backlogGames: this.state.backlogGames.filter((gameItem) => gameItem._id !== game._id)});
			this.setState(state =>{
					const playingGames = state.playingGames.concat(
						game
					);
					return{
						playingGames
					}
				})
		}
		console.log(updateGameResponse, "this is the game you just updated");
		this.setState({
			gameToUpdate: {}
		})
	}
	addToCompleted = async (game) =>{
		console.log(game, "gameToUpdate")
		await this.setState({
			gameToUpdate: {
				playing: null,
				completed: true
			}
		})
		const updateGameResponse = await fetch(`${process.env.REACT_APP_API_URL}/game/${game._id}`,{
			credentials: 'include',
			body: JSON.stringify(this.state.gameToUpdate),
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const updatedGameParsed = await updateGameResponse.json();
		if (updatedGameParsed.status === 200){
			this.setState({playingGames: this.state.playingGames.filter((gameItem) => gameItem._id !== game._id)});
		}
		console.log(updateGameResponse, "this is the game you just updated");
		this.setState({
			gameToUpdate: {}
		})
	}
	render(){
	const backlogItem = this.state.backlogGames.map((game, i) =>{
		if(game.playing === null && game.completed === null){
			return(
				<Col md={4} key={i}>
					<Card className="gameCard" >
						<Card.Img className="gameCardImage" variant='top' src={game.image} />
						<Card.Title className="gameCardTitle">{game.title}</Card.Title>
						<Card.Subtitle className="gameCardSubtitle">{game.studio}</Card.Subtitle>
						<Button onClick={(e) => this.addToPlaying(game)}>Add To Playing</Button>
						<Button onClick={(e) => this.deleteGame(game._id)} variant='primary'>Remove From Backlog</Button>
					</Card>
				</Col>
			)
		}
	});
	const playingItemTemp = this.state.playingGames.map((game, i) =>{
		return(
			<Col md={4} key={i}>
				<Card className="gameCard" >
					<Card.Img className="gameCardImage" variant='top' src={game.image} />
					<Card.Title className="gameCardTitle">{game.title}</Card.Title>
					<Card.Subtitle className="gameCardSubtitle">{game.studio}</Card.Subtitle>
					<Button onClick={(e) => this.addToCompleted(game)}>Completed Game</Button>
					<Button onClick={(e) => this.deleteGame(game._id)} variant='primary'>Remove From Backlog</Button>
				</Card>
			</Col>
		)
	})
	const playingItem = this.state.backlogGames.map((game, i) =>{
		if(game.playing){
			return(
				<Col md={4} key={i}>
					<Card className="gameCard" >
						<Card.Img className="gameCardImage" variant='top' src={game.image} />
						<Card.Title className="gameCardTitle">{game.title}</Card.Title>
						<Card.Subtitle className="gameCardSubtitle">{game.studio}</Card.Subtitle>
						<Button onClick={(e) => this.addToCompleted(game)}>Completed Game</Button>
						<Button onClick={(e) => this.deleteGame(game._id)} variant='primary'>Remove From Backlog</Button>
					</Card>
				</Col>
			)
		}
	})		
	return (
		<div>
			<Navbar sticky="top" variant="dark" bg='dark'>	
				<Col>
					<Navbar.Brand href='/'>Backlog</Navbar.Brand>
				</Col>
				<Col>
				</Col>
				<Col>
					<DropdownButton title='Dropdown' className='headerDropDown'>
						<Dropdown.Item>Profile</Dropdown.Item>
						<Dropdown.Item href='/completedGames'>Completed Games</Dropdown.Item>
						<Dropdown.Item onClick={this.props.logout}>LogOut</Dropdown.Item>
					</DropdownButton>
				</Col>			
			</Navbar>
			<Container>
				<h1>Playing:</h1>
				<Row>
					{ playingItem }
					{ playingItemTemp }
				</Row>
				<h1>Backlog:</h1>
				<Row>
					{ backlogItem } 
				</Row>
			</Container>
		</div>
	)
}
}


export default BacklogPage;
