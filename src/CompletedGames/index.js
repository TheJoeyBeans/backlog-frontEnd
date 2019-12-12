import React, { Component } from 'react';
import { Image, Row, Col, Container, Card, Button, Navbar, Dropdown, DropdownButton, ButtonToolbar } from 'react-bootstrap';

class CompletedGames extends Component{
	constructor(){
		super()

		this.state={
			backlogGames: [],
			gameToUpdate:{}
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
		} else {
			console.log('did not delete');
		}
	}
	render(){	
	const completedGame = this.state.backlogGames.map((game, i) =>{
		if(game.completed){
			return(
				<Col md={4} key={i}>
					<Card className="gameCard" >
						<Card.Img className="gameCardImage" variant='top' src={game.image} />
						<Card.Title className="gameCardTitle">{game.title}</Card.Title>
						<Card.Subtitle className="gameCardSubtitle">{game.studio}</Card.Subtitle>
						<Button onClick={(e) => this.deleteGame(game._id)} variant='primary'>Remove From Backlog</Button>
					</Card>
				</Col>
			)
		}
	});
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
						<Dropdown.Item href='/backlog'>Backlog</Dropdown.Item>
						<Dropdown.Item onClick={this.props.logout}>LogOut</Dropdown.Item>
					</DropdownButton>
				</ButtonToolbar>
				</Col>			
			</Navbar>
			<Container>
				<h1 className='backlogListTitle'>Completed Games:</h1>
				<Row>
					{ completedGame }
				</Row>
			</Container>
		</div>
	)
}
}


export default CompletedGames;
