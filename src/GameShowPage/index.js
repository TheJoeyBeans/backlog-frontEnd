import React, { Component } from 'react';
import axios from 'axios';
import { Image, Row, Col, Container, Card, Button, Navbar, Dropdown, DropdownButton, Form } from 'react-bootstrap';


class GameShowPage extends Component{
	constructor(props){
		super(props)

		this.state ={
			publishers: [],
			developers: [],
			extended: false,
			gameDescription: '',
			commentInput: '',
			comments: []
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

	expandText = (e) =>{
		if(this.state.extended){
			this.setState({
				extended: false
			})
		} else {
			this.setState({
				extended: true
			})
		}
	}

	handleChange = (e) => {
		e.preventDefault();
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	addToComments = () =>{
		this.setState(state =>{
		const comments = state.comments.concat(
			this.state.commentInput
		);
		return{
			comments
		}
	})
	this.saveComment(this.props.location.state.sentGame)		
	}

	saveComment = async (game) =>{

		const gameUniqueId = game._id
		console.log(game, "this is the gameId fool")
		const updateGameResponse = await fetch(`${process.env.REACT_APP_API_URL}/game/${gameUniqueId}/comment`,{
			credentials: 'include',
			body: JSON.stringify(this.state.comments),
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const updatedGameParsed = await updateGameResponse.json();
		if (updatedGameParsed.status === 200){
			console.log(updateGameResponse, "seems to work")
		}
		this.setState({
			commentInput: ''
		})
	}
	render(){
		return(
			<div className='gameShowPage'>
				<Navbar sticky="top" variant="dark" bg='dark'>	
					<Col>
						<Navbar.Brand href='/'>Backlog</Navbar.Brand>
					</Col>
					<Col>
					</Col>
					<Col>
						<DropdownButton title='Dropdown' className='headerDropDown'>
							<Dropdown.Item href='/backlog'>Backlog</Dropdown.Item>
							<Dropdown.Item href='/completedGames'>Completed Games</Dropdown.Item>
							<Dropdown.Item onClick={this.props.logout}>LogOut</Dropdown.Item>
						</DropdownButton>
					</Col>			
				</Navbar>
				<Container>
					<div id='gameShowPageBody'>
					<Row>
						<Col md={1}>
						</Col>
						<Col md={10}>
							<Row>
								<Col>
									<h1 id='gameShowPageTitle'>{this.state.gameTitle}</h1>	
								</Col>
							</Row>
							<Row>
							<Col md={8}>
								<div>
									<img id='gameShowPageImage' src={this.state.image}/>
								</div>
								<div class="gameShowDescription">
									{this.state.extended ? 
										<React.Fragment><p id='#gameShowPageDescription'>{this.state.gameDescription}</p><Button onClick={this.expandText}>Read Less...</Button></React.Fragment> 
										: 
										<React.Fragment><p id='#gameShowPageDescription'>{this.state.gameDescription.substr(0, 450)}</p><Button onClick={this.expandText}>Read More...</Button></React.Fragment>
									}
								</div>
							</Col>
							<Col md={4}>
								<h1>Comments</h1>
								<Form>
									<Form.Group>
										<Form.Control name='commentInput' onChange={this.handleChange} type='text' placeholder='Log your experiences here...'/>
									</Form.Group>
									<Button onClick={this.addToComments}>Submit</Button>
								</Form>
							</Col>
							</Row>
						</Col>	
						<Col md={1}>
						</Col>
					</Row>
					</div>
				</Container>
			</div>
		)
	}
}

export default GameShowPage;