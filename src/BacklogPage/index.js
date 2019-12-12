import React, { Component } from 'react';
import { Image, Row, Col, Container, Card, Button, Navbar, Dropdown, DropdownButton, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
						<Card.Title className="gameCardTitle"><Link to={{
						pathname: '/gameDisplay',
						state:{
							sentGame: game
						}
					}}>{game.title}</Link></Card.Title>
						<Card.Subtitle className="gameCardSubtitle">{game.studio}</Card.Subtitle>
						<div className='cardButtons'>
							<Button className='cardButtonRight' size='sm' onClick={(e) => this.addToPlaying(game)}>Playing</Button>
							<Button className='cardButtonLeft' size='sm' onClick={(e) => this.deleteGame(game._id)} variant='primary'>Remove</Button>
						</div>
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
					<Card.Title className="gameCardTitle"><Link to={{
						pathname: '/gameDisplay',
						state:{
							sentGame: game
						}
					}}>{game.title}</Link></Card.Title>
					<Card.Subtitle className="gameCardSubtitle">{game.studio}</Card.Subtitle>
					<div className='cardButtons'>
						<Button className='cardButtonRight' size='sm' onClick={(e) => this.addToCompleted(game)}>Completed</Button>
						<Button className='cardButtonLeft' size='sm' onClick={(e) => this.deleteGame(game._id)} variant='primary'>Remove</Button>
					</div>
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
						<Card.Title className="gameCardTitle"><Link to={{
						pathname: '/gameDisplay',
						state:{
							sentGame: game
						}
					}}>{game.title}</Link></Card.Title>
						<Card.Subtitle className="gameCardSubtitle">{game.studio}</Card.Subtitle>
						<div className='cardButtons'>
							<Button className='cardButtonRight' size='sm' onClick={(e) => this.addToCompleted(game)}>Completed</Button>
							<Button className='cardButtonLeft' size='sm' onClick={(e) => this.deleteGame(game._id)} variant='primary'>Remove</Button>
						</div>
					</Card>
				</Col>
			)
		}
	})		
	return (
		<div>
			<Navbar sticky="top" variant="dark" bg='dark'>	
				<Col>
					<Navbar.Brand className='navBarTitle' href='/'>Backlog</Navbar.Brand>
				</Col>
				<Col>
				</Col>
				<Col>
				<ButtonToolbar className='headerDropDown'>
					<DropdownButton drop={'left'} variant="primary" title={'Profile'} id={'dropdown-button-drop-down'} key={'left'} className='dropDownList'>
						<Dropdown.Item>Profile</Dropdown.Item>
						<Dropdown.Item href='/completedGames'>Completed</Dropdown.Item>
						<Dropdown.Item onClick={this.props.logout}>LogOut</Dropdown.Item>
					</DropdownButton>
				</ButtonToolbar>
				</Col>			
			</Navbar>
			<Container>
				<h1 className='backlogListTitle'>Playing:</h1>
				<Row>
					{ playingItem }
					{ playingItemTemp }
				</Row>
				<h1 className='backlogListTitle'>Backlog:</h1>
				<Row>
					{ backlogItem } 
				</Row>
			</Container>
		</div>
	)
}
}


export default BacklogPage;
