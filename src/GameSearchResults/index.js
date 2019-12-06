import React from 'react';
import { Image, Row, Col, Container, Card, Button } from 'react-bootstrap';

function GameSearchResults(props){
	const gameItem = props.gameResults.map((game) =>{
		return(
			<Col md={4}>
				<Card className="gameCard">
					<Card.Img className="gameCardImage" variant='top' src={game.pic} />
					<Card.Title>{game.title}</Card.Title>
					<Button variant='primary'>Add To Backlog</Button>
				</Card>
			</Col>
		)
	});
	return (
		<Container>
			<Row>
				{gameItem}
			</Row>
		</Container>
	)
}


export default GameSearchResults;

