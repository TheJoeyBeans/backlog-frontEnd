import React, { Component } from 'react';
import { Image, Row, Col, Container, Card, Button, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';

class BacklogPage extends Component{
	constructor(props){
		super(props)

		this.state={
			backlogGames: []
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
	render(){
	const gameItem = this.state.backlogGames.map((game, i) =>{
		return(
			<Col md={4} key={i}>
				<Card className="gameCard" >
					<Card.Img className="gameCardImage" variant='top' src={game.image} />
					<Card.Title className="gameCardTitle">{game.title}</Card.Title>
					<Card.Subtitle className="gameCardSubtitle">{game.studio}</Card.Subtitle>
				</Card>
			</Col>
		)
	});		
	return (
		<Container>
			<Navbar sticky="top" variant="dark" bg='dark'>	
				<Col>
					<Navbar.Brand href='/'>Backlog</Navbar.Brand>
				</Col>
				<Col>
				</Col>
				<Col>
					<DropdownButton title='Dropdown' className='headerDropDown'>
						<Dropdown.Item>Profile</Dropdown.Item>
						<Dropdown.Item href='/backlog'>Backlog</Dropdown.Item>
						<Dropdown.Item>Completed Games</Dropdown.Item>
						<Dropdown.Item onClick={this.props.logout}>LogOut</Dropdown.Item>
					</DropdownButton>
				</Col>			
			</Navbar>
			<Row>
				{ gameItem } 
			</Row>
		</Container>
	)
}
}


export default BacklogPage;
