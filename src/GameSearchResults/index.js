import React from 'react';
import { Image, Row, Col, Container, Card, Button } from 'react-bootstrap';

function GameSearchResults(props){
	const backlog = props.backlog;
	console.log(backlog, "this is your backlog")
	console.log(props.gameResults, "these are your game results")
	console.log(props.userIsLogged, "User logged?")
	const gameItem = props.gameResults.map((game, i) =>{
		if(backlog.length === 0){
			return(		
				<Card key={i} className="gameCard" >
					<Card.Img className="gameCardImage" variant='top' src={game.pic} />
					<Card.Title className="gameCardTitle">{game.title}</Card.Title>
					<Button className='gameCardButton' size='sm' onClick={(e) => props.grabId(game.id)} variant='primary'>Add To Backlog</Button>
				</Card>	
			)
		} else {
		const nonBacklogItem = backlog.map((gameItem, j) =>{
			if(props.userIsLogged === null || game.id != gameItem.gameId){
		return(		
			<Card key={j} className="gameCard" >
				<Card.Img className="gameCardImage" variant='top' src={game.pic} />
				<Card.Title className="gameCardTitle">{game.title}</Card.Title>
				<Button onClick={(e) => props.grabId(game.id)} variant='primary'>Add To Backlog</Button>
			</Card>	
		)
		} else {
			return(
				<Card key={j} className="gameCard" >
					<Card.Img className="gameCardImage" variant='top' src={game.pic} />
					<Card.Title className="gameCardTitle">{game.title}</Card.Title>
					<h4>BACKLOGGED</h4>
				</Card>
			)
		}			
		})
		return(
			<div key={i}>
				{nonBacklogItem}
			</div>
		)
	}
	});
	return (
		<Container>
			<Row>
				{gameItem}
			</Row>
		</Container>
	)
}

// function GameSearchResults(props){
// 	const backlog = props.backlog;
// 	const gameItem = props.gameResults.map((game, i) =>{
// 		return(
// 			<Col md={4} key={i}>
// 				<Card className="gameCard" >
// 					<Card.Img className="gameCardImage" variant='top' src={game.pic} />
// 					<Card.Title className="gameCardTitle">{game.title}</Card.Title>
// 					<Button onClick={(e) => props.grabId(game.id)} variant='primary'>Add To Backlog</Button>
// 				</Card>
// 			</Col>
// 		)
// 	});
// 	return (
// 		<Container>
// 			<Row>
// 				{gameItem}
// 			</Row>
// 		</Container>
// 	)
// }


export default GameSearchResults;

