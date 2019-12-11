import React from 'react';
import { Image, Row, Col, Container, Card, Button } from 'react-bootstrap';

function GameSearchResults(props){
	const backlog = props.backlog;
	const gameItem = props.gameResults.map((game, i) =>{
		return(
			<Col md={4} key={i}>
				<Card className="gameCard" >
					<Card.Img className="gameCardImage" variant='top' src={game.pic} />
					<Card.Title className="gameCardTitle">{game.title}</Card.Title>
					<Button onClick={(e) => props.grabId(game.id)} variant='primary'>Add To Backlog</Button>
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

