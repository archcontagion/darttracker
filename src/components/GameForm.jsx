import React, { useContext } from 'react'
import { AppContext } from '../AppContext';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import PlayerVersusList from './PlayerVersusList';
import { GameType } from './GameType';
import PlayerRooster from './PlayerRooster';

const GameForm = () => {
    const {setLegs,
           setSets,
           legs,
           sets,
           setActiveView,
           players} = useContext(AppContext);

    const handleSubmit = (event)=> {
        event.preventDefault();
        if (players.length < 2)
        {
            document.getElementsByClassName('infoStart')[0].style.display = "block"; 
        }
        else {
            document.getElementsByClassName('infoStart')[0].style.display = "none"; 
            setActiveView('page-2');
        }
    
    }

  return (
    <div className="game-form">

    <PlayerVersusList></PlayerVersusList>
    
    <PlayerRooster></PlayerRooster>

    <Form onSubmit={handleSubmit}>
    <Button className="playButton" type="submit">
      <h2>Spiel starten</h2>
      <Image className="playButton" src={`../../images/playButton.png`} alt={`Spiel starten`} />
    </Button>
    <div className="infoStart" style={{display:'none', color:'white'}}>Please enter at least two players, in order to start the game.</div>
    <br/><br/>
    <Form.Group className="gameTypeContainer" controlId="gameForm">
      <GameType></GameType>
    </Form.Group> 
    <br/> 
      <Form.Group controlId="SetForm">
      <Form.Label>Sets</Form.Label>
      <Form.Control type="number" onChange={(event)=>{setLegs(event.target.value)}} value={legs} placeholder="How many sets?" />
      </Form.Group>
      <Form.Group controlId="LegForm">
      <Form.Label>Legs</Form.Label>
      <Form.Control type="number" onChange={(event)=>{setSets(event.target.value)}} value={sets} placeholder="How many legs?" /> 
      </Form.Group>
      <br/>

    </Form>
    </div>
  )
}

export default GameForm