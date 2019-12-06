import React, { Component } from 'react';
import { Form, Button, Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: ''
		}
	}

	handleChange = (e) => {
		e.preventDefault();
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		});
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const loginUrl = `${process.env.REACT_APP_BACKEND_URL}/register/login`;
		console.log(loginUrl, "This is the login URL"); 
		const loginResponse = await fetch(loginUrl, {
			method: 'POST',
			body: JSON.stringify(this.state),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		console.log(loginResponse, "This is the login response")
		const parsedResponse = await loginResponse.json();
		console.log(parsedResponse, "this is your parsedResponse");
		if (parsedResponse.status === 200){
			console.log('login successful');
			this.props.history.push('/');
		} else {
			console.log('did not login')
		}
		
	}

	render() {
		return(
			<div>
				<Navbar sticky="top" variant="dark" bg='dark'>	
					<Link to="/"><Navbar.Brand>Backlog</Navbar.Brand></Link>		
				</Navbar>
				<Container className="registrationContainer">
					<Form>
						<Form.Group>
							<Form.Label>Email address</Form.Label>
							<Form.Control name='email' onChange={this.handleChange} type='email' placeholder='Enter email'/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control name='password' onChange={this.handleChange}  type='password' placeholder='Password'/>
						</Form.Group>
						<Button onClick={this.handleSubmit}variant='primary' type='submit'>Submit</Button>
					</Form>
				</Container>
			</div>
		)
	}
}

export default LoginPage;