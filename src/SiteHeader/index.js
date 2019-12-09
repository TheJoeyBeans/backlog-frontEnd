import React, { Component } from 'react';
import { Navbar, Dropdown, Form, FormControl, Col, Button, DropdownButton } from 'react-bootstrap';
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
					{this.props.logged ? (
						<DropdownButton title='Dropdown' className='headerDropDown'>
							<Dropdown.Item>Profile</Dropdown.Item>
							<Dropdown.Item href='/backlog'>Backlog</Dropdown.Item>
							<Dropdown.Item>Completed Games</Dropdown.Item>
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

export default SiteHeader;