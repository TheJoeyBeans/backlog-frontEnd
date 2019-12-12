import React, { Component } from 'react';
import { Form, Button, Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class RegistrationPage extends Component {
	constructor() {
		super();

		this.state = {
			displayName: '',
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
		const registrationUrl = `${process.env.REACT_APP_API_URL}/register/`;
		console.log(registrationUrl, "This is the registration URL"); 
		const registerResponse = await fetch(registrationUrl, {
			method: 'POST',
			body: JSON.stringify(this.state),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		console.log(registerResponse, "This is the registration response")
		const parsedResponse = await registerResponse.json();
		console.log(parsedResponse, "this is your parsedResponse");
		if (parsedResponse.status === 201){
			sessionStorage.clear();
			sessionStorage.setItem('userIsLogged', true);
			console.log('Sign up successful');
			this.props.history.push('/');
		} else if(parsedResponse.code === 11000) {
			console.log('A user with that email address already exists');
		}
		
	}

	render() {
		return(
			<div>
				<Navbar sticky="top" variant="dark" bg='dark'>	
					<Link to="/"><Navbar.Brand className='navBarTitle'>Backlog</Navbar.Brand></Link>		
				</Navbar>
				<Container className="registrationContainer">
					<Form>
						<Form.Group>
							<Form.Label>Display Name</Form.Label>
							<Form.Control name='displayName' onChange={this.handleChange} type='text' placeholder='Enter Display Name'/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Email address</Form.Label>
							<Form.Control name='email' onChange={this.handleChange} type='email' placeholder='Enter email'/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control name='password' onChange={this.handleChange}  type='password' placeholder='Password'/>
						</Form.Group>
						<div>
							<Button onClick={this.handleSubmit}variant='primary' type='submit'>Submit</Button>
							<p className='loginLink'>To Login Click <Link to='/login'>Here</Link></p>
						</div>
					</Form>
				</Container>
			</div>
		)
	}
}

export default RegistrationPage;