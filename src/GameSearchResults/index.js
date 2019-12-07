import React from 'react';
import { Image, Row, Col, Container, Card, Button } from 'react-bootstrap';

function GameSearchResults(props){
	const gameItem = props.gameResults.map((game) =>{
	function backLogButton(props){
		const isLoggedIn = props.session;
		if (isLoggedIn) {
			return <Button onClick={(e) => props.grabId(game.id)} variant='primary'>Add To Backlog</Button>;
		}
	}
		return(
			<Col md={4}>
				<Card className="gameCard">
					<Card.Img className="gameCardImage" variant='top' src={game.pic} />
					<Card.Title className="gameCardTitle">{game.title}</Card.Title>
					{ backLogButton }
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

