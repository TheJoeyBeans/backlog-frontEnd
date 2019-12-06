import React, { Component } from 'react';
import { Navbar, NavDropdown, Form, FormControl, Col, Button } from 'react-bootstrap';

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

	render(){
		return(
			<Navbar sticky="top" variant="dark" bg='dark'>	
				<Col>
					<Navbar.Brand>Backlog</Navbar.Brand>
				</Col>
				<Col>
					<Form>
						<FormControl onChange={this.handleChange} type="text" placeholder="Search" className='searchBar'/>
					</Form>
					<Button id="searchButton" onClick={() => this.props.fetchResults(this.state.searchInput)}>Search</Button>
				</Col>
				<Col>
					<NavDropdown title='Dropdown'id="basic-nav-dropdown" className='headerDropDown'>
						<NavDropdown.Item>Profile</NavDropdown.Item>
						<NavDropdown.Item>Backlog</NavDropdown.Item>
						<NavDropdown.Item>Completed Games</NavDropdown.Item>
					</NavDropdown>
				</Col>			
			</Navbar>
		)
	}
}

export default SiteHeader;