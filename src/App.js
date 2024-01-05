import './App.scss';
import React, { useState, useEffect } from 'react'
import { AppContext } from './contexts/AppContext';
import GameSession from './components/GameSession';
import GameForm from './components/GameForm';
import StartPage from './components/StartPage';
import GameTypePage from './components/GameTypePage';
import LoginRegisterPage from './components/LoginRegisterPage';
import axios from './axios';




const App = () => {  
  
  const [modalOpen,setModalOpen] = useState(false);
  const [modalMessage,setModalMessage] = useState('');
  const [activeView,setActiveView] = useState('page-0');
  const [gameType,setGameType] = useState(501);
  const [gameSession,setGameSession] = useState({});
  const [playerRoster,setPlayerRoster] = useState([]);
  const [player1, setPlayer1] = useState({player_id:'noPlayer_01'});
  const [player2, setPlayer2] = useState({player_id:'noPlayer_02'});
  const [sessionPlayers, setSessionPlayers] = useState([]);
  const [activePlayer,setActivePlayer] = useState({});
  const [inactivePlayerScore,setInactivePlayerScore] = useState({});
  const [activePlayerScore,setActivePlayerScore] = useState({});
  const [inactivePlayer,setInactivePlayer] = useState({});
  const [throwCount, setThrowCount] = useState(3);
  const [currentThrowScores, setCurrentThrowScores] = useState([]);

  const callModal = (message) => {
    setModalMessage(message);
    setModalOpen(true);
  }

  
  async function getPlayerRoster() {
		axios.get('/api/players').then( response => {
			setPlayerRoster(response.data);
		  } ).catch( ( error ) => {
			console.log( error );
		  } );
		return true;
	}

  useEffect(() => {
    getPlayerRoster();
  }, [])


  // all the hooks that will be given to the central AppContext, 
  // so that child components have the ability to change values outside of their scope.
  const state = {

    'modalOpen': modalOpen,
    'setModalOpen': setModalOpen,
    'callModal': callModal,
    'modalMessage': modalMessage,
    'setModalMessage': setModalMessage,

    'setGameSession' : setGameSession,
    'gameSession': gameSession,

    'player1': player1,
    'player2': player2,
    'setPlayer1': setPlayer1,
    'setPlayer2': setPlayer2,

    'setGameType': setGameType,


    'setActiveView': setActiveView,
    'gameType': gameType,

    'sessionPlayers': sessionPlayers,
    'setSessionPlayers': setSessionPlayers,

    'inactivePlayer': inactivePlayer,
    'setInactivePlayer': setInactivePlayer,
    'activePlayer': activePlayer,
    'setActivePlayer': setActivePlayer,
    'setActivePlayerScore': setActivePlayerScore,
    'activePlayerScore':activePlayerScore,
    'inactivePlayerScore':inactivePlayerScore,
    'setInactivePlayerScore': setInactivePlayerScore,

    'playerRoster': playerRoster,
    
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
