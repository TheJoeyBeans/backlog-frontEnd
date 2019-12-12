import React, { Component } from 'react';
import { Navbar, Dropdown, Form, FormControl, Col, Row, Button, DropdownButton, ButtonToolbar } from 'react-bootstrap';
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
					<Navbar.Brand className='navBarTitle'>Backlog</Navbar.Brand>
				</Col>
				<Col>
					<Form>
						<FormControl onKeyPress={this.handleKeyPress} onChange={this.handleChange} type="text" placeholder="Search for some games..." className='searchBar'/>
					</Form>
				</Col>
				<Col>
					{this.props.logged ? (
						<ButtonToolbar className='headerDropDown'>
							<DropdownButton drop={'left'} variant="primary" title={'Profile'} id={'dropdown-button-drop-down'} key={'left'} className='dropDownList'>
								<Dropdown.Item href='/backlog'>Backlog</Dropdown.Item>
								<Dropdown.Item href='/completedGames'>Completed Games</Dropdown.Item>
								<Dropdown.Item onClick={this.props.logout}>LogOut</Dropdown.Item>
							</DropdownButton>
						</ButtonToolbar>
					) : (
						<ButtonToolbar className='headerDropDown'>
							<DropdownButton drop={'left'} variant="primary" title={'Sign In/Register'} id={'dropdown-button-drop-left'} key={'left'} className='dropDownList'>
								<Dropdown.Item href='/registration'>Register New Account</Dropdown.Item>
								<Dropdown.Item href='/login'>Login To Account</Dropdown.Item>
							</DropdownButton>
						</ButtonToolbar>
					)}
				</Col>			
			</Navbar>
		)
	}
}

// <Button id="searchButton" onClick={() => }>Search</Button>

export default SiteHeader;