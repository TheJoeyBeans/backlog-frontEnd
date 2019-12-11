import React, { Component } from 'react';
import { Navbar, Dropdown, Form, FormControl, Col, Row, Button, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SiteHeader extends Component{
	constructor(props){
		super(props);

		this.state={
			searchInput: ''
		}
	}

	handleChange = (e) =>{
		this.setState({
			searchInput: e.currentTarget.value
		})
	}

	handleKeyPress = (e) =>{
		if(e.key === 'Enter'){
			e.preventDefault();
			this.props.fetchResults(this.state.searchInput)
		}
	}
	
	render(){
		return(
			<Navbar sticky="top" variant="dark" bg='dark'>	
				<Col>
					<Navbar.Brand>Backlog</Navbar.Brand>
				</Col>
				<Col>
					<Form>
						<FormControl onKeyPress={this.handleKeyPress} onChange={this.handleChange} type="text" placeholder="Search for some games..." className='searchBar'/>
					</Form>
				</Col>
				<Col>
					{this.props.logged ? (
						<DropdownButton title='Dropdown' className='headerDropDown'>
							<Dropdown.Item href='/backlog'>Backlog</Dropdown.Item>
							<Dropdown.Item href='/completedGames'>Completed Games</Dropdown.Item>
							<Dropdown.Item onClick={this.props.logout}>LogOut</Dropdown.Item>
						</DropdownButton>
					) : (
						<DropdownButton title='Dropdown' className='headerDropDown'>
							<Dropdown.Item href='/registration'>Register New Account</Dropdown.Item>
							<Dropdown.Item href='/login'>Login To Account</Dropdown.Item>
						</DropdownButton>
					)}
				</Col>			
			</Navbar>
		)
	}
}

// <Button id="searchButton" onClick={() => }>Search</Button>

export default SiteHeader;