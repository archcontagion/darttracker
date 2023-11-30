import './App.css';
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
  const [newPlayer, setNewPlayer] = useState('');
  // don´t know how one could set this without the redundant setter. Doesn´t work with single variable.
  const [players, setPlayers] = useState([]);

  const state = {
    'setGameType': setGameType,
    'setActiveView': setActiveView,
    'gameType':gameType,
    'legs':legs,
    'sets':sets,
    'players':players
  }
  

  const handleSubmit = (e)=> {
    e.preventDefault();
  }

  const addPlayer = () => {
    if (newPlayer !== '')
    {
      players.push({id:uuid() ,name: newPlayer, score: gameType});
      setNewPlayer('');
    }
  }

    return (
      // Context Provider to have central state props, that can be easily handed down to child components
      // all the information that needs to be set to be able to start a game session.
      <AppContext.Provider value={state}>
      <div className="App">
      {activeView === 'page-1'? 
        <div id="page-1" className="page">
          <div className="game-form">
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="gameForm">
            <GameType></GameType>
          </Form.Group> 
          <br/> 
            <Form.Group className="mb-3" controlId="SetForm">
            <Form.Label>Sets</Form.Label>
            <Form.Control type="number" onChange={(e)=>{setLegs(e.target.value)}} value={legs} placeholder="How many sets?" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="LegForm">
            <Form.Label>Legs</Form.Label>
            <Form.Control type="number" onChange={(e)=>{setSets(e.target.value)}} value={sets} placeholder="How many legs?" /> 
            </Form.Group>

            <Form.Label className="playerNameLabel">Player Name</Form.Label> 
            <Form.Group className="mb-12" controlId="PlayerForm">
            <div className="playListHeader">
              <Form.Control type="text" onChange={(e)=>{setNewPlayer(e.target.value)}} value={newPlayer} /> 
              <Button variant="primary" className="playerAddBtn" onClick={()=>{addPlayer()}}>+</Button> 
            </div>
            </Form.Group>

            <PlayerList></PlayerList>
          
          <br/>
          <Button onClick={()=>{setActiveView('page-2')}} variant="primary" type="submit">
            Start Game
          </Button>
          </Form>
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
