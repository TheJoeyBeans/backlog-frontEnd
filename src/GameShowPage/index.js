import React, { Component } from 'react';

class GameShowPage extends Component{
	constructor(props){
		super(props)
	}

	render(){
		console.log(this.props.location.state)
		return(
			<div>
				<p>hi</p>
			</div>
		)
	}
}

export default GameShowPage;