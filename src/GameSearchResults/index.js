import React from 'react';
import { Image, Row, Col, Container } from 'react-bootstrap';

function GameSearchResults(props){
	const gameItem = props.gameResults.map((game) =>{
		return(
			<Row className='gameListItem' key={game.id}>
				<Col md={6}>
					<Image src={game.pic} thumbnail/>
				</Col>
				<Col md={6}>
					<h4>{game.title}</h4>
				</Col>
			</Row>
		)
	});
	return (
		<Container>
			{gameItem}
		</Container>
	)
}


export default GameSearchResults;