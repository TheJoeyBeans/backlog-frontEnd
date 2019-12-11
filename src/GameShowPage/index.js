import React, { Component } from 'react';
import axios from 'axios';
import { Image, Row, Col, Container, Card, Button, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';

class GameShowPage extends Component{
	constructor(props){
		super(props)

		this.state ={
			publishers: [],
			developers: []
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
				gameDescription: response.data.description_raw,
				ratings: response.data.ratings
			})
		})
	}

	render(){
		return(
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
							<Dropdown.Item href='/backlog'>Backlog</Dropdown.Item>
							<Dropdown.Item href='/completedGames'>Completed Games</Dropdown.Item>
							<Dropdown.Item onClick={this.props.logout}>LogOut</Dropdown.Item>
						</DropdownButton>
					</Col>			
				</Navbar>
				<Container>
					<Row>
						<Col>
							<h1 id='gameShowPageTitle'>{this.state.gameTitle}</h1>	
						</Col>
					</Row>
					<div id='gameShowPageBody'>
					<Row>
							<Col>
								<div>
									<img id='gameShowPageImage' src={this.state.image}/>
								</div>
							</Col>
							<Col md={7}>
								<div >
									<p id='gameShowPageDescription'>{this.state.gameDescription}</p>
								</div>
							</Col>	
					</Row>
					</div>
				</Container>
			</div>
		)
	}
}

export default GameShowPage;