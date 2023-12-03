import './App.scss';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PlayerList from './components/PlayerList';
import {v1 as uuid} from "uuid"; 
import { AppContext } from './AppContext';
import GameSession from './components/GameSession';
import { GameType } from './components/GameType';




const App = () => {  


  
  const [activeView,setActiveView] =useState('page-1');
  const [gameType,setGameType] = useState(501);
  const [sets, setSets] = useState(1);
  const [legs, setLegs] = useState (3);
  const [playerScore, setPlayerScore] = useState(501);

  // currently hard coded for development
  // const [players, setPlayers] = useState([{id:uuid() ,name: 'Phillip',title: 'D-Master', score: gameType, avatar: "Player_1.jpg"},
  // {id:uuid() ,name: 'Mike',title: 'Sharpshooter', score: gameType, avatar: "Player_2.jpg"}]);
  // const [activePlayer,setActivePlayer] = useState(players[0].id);

  const [players, setPlayers] = useState([]);
  const [activePlayer,setActivePlayer] = useState();
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerTitle, setNewPlayerTitle] = useState('');
  const [newPlayerImage, setNewPlayerImage] = useState('');




  
  // all the hooks that will be given to the central AppContext, 
  // so that child components have the ability to change values outside of their scope.
  const state = {
    'setGameType': setGameType,
    'setActiveView': setActiveView,
    'gameType':gameType,
    'legs':legs,
    'sets':sets,
    'players':players,
    'setPlayers': setPlayers,
    'setPlayerScore':setPlayerScore,
    'playerScore':playerScore,
    'activePlayer':activePlayer,
    'setActivePlayer':setActivePlayer
  }
  

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

  const addPlayer = () => {
    if (newPlayerName !== '' && newPlayerImage !== '')
    {
      players.push({id:uuid() ,name: newPlayerName, title:newPlayerTitle, score: gameType, avatar: newPlayerImage});
      setNewPlayerName('');
      setNewPlayerTitle('');
      setNewPlayerImage('');
      // if first player in players array set to activePlayer
      if (players.length === 1)
      {
       setActivePlayer(players[0].id);
      }

    }
  }


    return (
      // Context Provider to have central state props, that can be easily handed down to child components
      // all the information that needs to be set to be able to start a game session.
      <AppContext.Provider value={state}>
      <div className="App">
      {activeView === 'page-1'? 
        <div id="page-1" className="page">
          <div className="gridContainer">
            <div className="game-form">
            <Form onSubmit={handleSubmit}>
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
              <Form.Group  controlId="PlayerForm">
              <div className="playListHeader">
                <Form.Label>Player Name</Form.Label> 
                <Form.Control placeholder="Please  insert your name" type="text" onChange={(e)=>{setNewPlayerName(e.target.value)}} value={newPlayerName} /> 
                <Form.Label>Player Title</Form.Label> 
                <Form.Control placeholder="Please  insert your title" type="text" onChange={(e)=>{setNewPlayerTitle(e.target.value)}} value={newPlayerTitle} /> 
                <Form.Label>Player Image</Form.Label> 
                <Form.Control placeholder="Please  insert filename" type="text" onChange={(e)=>{setNewPlayerImage(e.target.value)}} value={newPlayerImage} /> 
                <Button className="playerAddBtn" onClick={()=>{addPlayer()}}>+</Button> 
              </div>
              </Form.Group>

              <PlayerList></PlayerList>
            
            <br/>
            <Button type="submit">
              Start Game
            </Button>
            <div className="infoStart" style={{display:'none', color:'white'}}>Please enter at least two players, in order to start the game.</div>
            </Form>
            </div>
          </div>
      </div>
      : null }
      {activeView === 'page-2'?
        <GameSession/>
      : null }


    </div>
    </AppContext.Provider>
    )
  
}

export default App;
