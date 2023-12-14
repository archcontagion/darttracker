import './App.scss';
import React, { useState } from 'react'
import {v1 as uuid} from "uuid"; 
import { AppContext } from './AppContext';
import GameSession from './components/GameSession';
import GameForm from './components/GameForm';
import StartPage from './components/StartPage';
import GameTypePage from './components/GameTypePage';
import LoginRegisterPage from './components/LoginRegisterPage';





const App = () => {  
  
  const [openModal,setOpenModal] = useState(false);
  const [modalMessage,setModalMessage] = useState('');
  const [activeView,setActiveView] = useState('page-0');
  const [gameType,setGameType] = useState(501);
  const [sets, setSets] = useState(1);
  const [legs, setLegs] = useState (3);
  const [playerScore, setPlayerScore] = useState(501);

  

  // Mock data
  let playerRooster = [
    {id:uuid() ,name: 'Phillip',title: 'D-Master', score: gameType, avatar: "Player_1.png"},
    {id:uuid() ,name: 'Mike',title: 'Sharpshooter', score: gameType, avatar: "Player_2.png"},
    {id:uuid() ,name: 'Sahra',title: 'Sniper', score: gameType, avatar: "Player_3.png"},
    {id:uuid() ,name: 'Jay',title: 'Bullseye', score: gameType, avatar: "Player_4.png"},
    {id:uuid() ,name: 'Bob',title: 'Quickdraw', score: gameType, avatar: "Player_5.png"},
    {id:uuid() ,name: 'Karsten',title: 'Sharpshooter', score: gameType, avatar: "Player_6.png"},
    {id:uuid() ,name: 'Bianka',title: 'Sharpshooter', score: gameType, avatar: "Player_7.png"},
    {id:uuid() ,name: 'Denise',title: 'Sharpshooter', score: gameType, avatar: "Player_8.png"},
    {id:uuid() ,name: 'Florian',title: 'Sharpshooter', score: gameType, avatar: "Player_9.png"},
    {id:uuid() ,name: 'Stefan',title: 'Sharpshooter', score: gameType, avatar: "Player_10.png"}
  ];


  // currently hard coded for development
  // const [players, setPlayers] = useState([{id:uuid() ,name: 'Phillip',title: 'D-Master', score: gameType, avatar: "Player_1.png"},
  // {id:uuid() ,name: 'Mike',title: 'Sharpshooter', score: gameType, avatar: "Player_2.png"}]);
  // const [activePlayer,setActivePlayer] = useState(players[0].id);

  // set players in vs screen to default values
  const [player1, setPlayer1] = useState({'id':'noPlayer_01','name':'','avatar':'noAvatar.png'});
  const [player2, setPlayer2] = useState({'id':'noPlayer_02','name':'','avatar':'noAvatar.png'});
  const [players, setPlayers] = useState([]);
  const [activePlayer,setActivePlayer] = useState();
  const [inactivePlayer,setInactivePlayer] = useState(); 
  const [throwCount, setThrowCount] = useState(3);
  const [currentThrowScores, setCurrentThrowScores] = useState([]);



  
  // all the hooks that will be given to the central AppContext, 
  // so that child components have the ability to change values outside of their scope.
  const state = {
    'openModal': openModal,
    'setOpenModal': setOpenModal,
    'modalMessage': modalMessage,
    'setModalMessage': setModalMessage,
    'player1': player1,
    'player2': player2,
    'setPlayer1': setPlayer1,
    'setPlayer2': setPlayer2,
    'setGameType': setGameType,
    'setLegs': setLegs,
    'setSets': setSets,
    'setActiveView': setActiveView,
    'gameType': gameType,
    'legs': legs,
    'sets': sets,
    'players': players,
    'setPlayers': setPlayers,
    'setPlayerScore': setPlayerScore,
    'playerScore': playerScore,
    'activePlayer': activePlayer,
    'setActivePlayer': setActivePlayer,
    'inactivePlayer': inactivePlayer,
    'setInactivePlayer': setInactivePlayer,
    'playerRooster': playerRooster,
    'throwCount': throwCount,
    'setThrowCount': setThrowCount,
    'currentThrowScores': currentThrowScores,
    'setCurrentThrowScores': setCurrentThrowScores
  }
  
    return (
      // Context Provider to have central state props, that can be easily handed down to child components
      // all the information that needs to be set to be able to start a game session.
      <AppContext.Provider value={state}>
      <div className="App">
      {activeView === 'page-0'? 
        <div id="page-0" className="page">
          <div className="gridContainer">
            <LoginRegisterPage/>
          </div>
      </div>
      : null }        
      {activeView === 'page-1'? 
        <div id="page-1" className="page">
          <div className="gridContainer">
            <StartPage/>
          </div>
      </div>
      : null }
      {activeView === 'page-2'? 
        <div id="page-1" className="page">
          <div className="gridContainer">
            <GameTypePage/>
          </div>
      </div>
      : null }
      {activeView === 'page-3'? 
        <div id="page-1" className="page">
          <div className="gridContainer">
            <GameForm/>
          </div>
      </div>
      : null }
      {activeView === 'page-4'?
        <GameSession/>
      : null }
    
    </div>
    </AppContext.Provider>
    )
  
}

export default App;
