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
  const [modalMode,setModalMode] = useState('notice');
  const [activeView,setActiveView] = useState('page-0');
  const [gameType,setGameType] = useState(501);
  const [initialSetValue,setInitialSetValue] = useState(1);
  const [initialLegValue,setInitialLegValue] = useState(3);
  const [gameSession,setGameSession] = useState({});
  const [playerRoster,setPlayerRoster] = useState([]);
  const [player1, setPlayer1] = useState({player_id:'noPlayer_01'});
  const [player2, setPlayer2] = useState({player_id:'noPlayer_02'});
  const [sessionPlayers, setSessionPlayers] = useState([]);
  const [activePlayer,setActivePlayer] = useState({});
  const [activeStartScore,setActiveStartScore] = useState(0);
  const [inactivePlayerScore,setInactivePlayerScore] = useState({});
  const [activePlayerScore,setActivePlayerScore] = useState({});
  const [inactivePlayer,setInactivePlayer] = useState({});
  const [throwCount, setThrowCount] = useState(3);
  const [currentThrowScores, setCurrentThrowScores] = useState([]);


  const callModal = (message, mode=modalMode) => {
    setModalMessage(message);
    setModalMode(mode);
    setModalOpen(true);
  }

  // save the current score of the finished round to the database  
  const saveCurrentScoreofRound = () =>{
  
    let updateRound = activePlayerScore.round_number += 1;

    axios.post(`/api/scores/`,
    {...activePlayerScore, 
      round_score: JSON.stringify(currentThrowScores),
      round_number: updateRound
    })
    .catch( ( error ) => {
    console.log( error );
    });
  }  


  //check if score is greater 1, otherwise it is not possible to end on double
  const checkIfScoreGreaterOne = (score) => {
    
    if (score > 1)
    {
        return true;
    }
    return false;
  }
                       

  // check if all darts used before the round is ended
  const checkIfAllDartsUsed = (currentThrowScores) => {

    // check if all darts were used
    if (currentThrowScores.length < 3)
    {
       
        return false;
    }
    return true;
  }

  // check if score is bust
  // check if last throw was double if score is 0
  const checkIfEndedOnDouble = (score,subtractScore,type)=>{   

    if (score - subtractScore === 0 && type !== 'double')
    {
        return false;
    }
    return true;
  }
  
  // check if score is bust
  // check if score has been overshot, not ending exactly on zero
  const checkIfOvershot = (score,subTractScore) => {

    if (score - subTractScore < 0)
    {
        return false;
    }
    return true;
  }
  
  const roundBustedOnOne = () => {
    // reset score to initial value
    setActivePlayerScore({...activePlayerScore, 
        is_busted: true
    });
    // Call Modal with button 'repeat throw' and 'end round'
    callModal("Da Ergebnis 1. Nicht mit Double beendbar.",'bust_notice');
  }

  // end round and change players, finish round has futher condition if player actively ends round
  const endRound = () =>{

    saveCurrentScoreofRound();
    setThrowCount(3);
    setCurrentThrowScores([]);
    setInactivePlayer(activePlayer);
    setInactivePlayerScore(activePlayerScore);
    setActivePlayer(inactivePlayer);
    setActivePlayerScore(inactivePlayerScore);
    // save start score of active player, to be able to reset score back in case of busted score
    setActiveStartScore(activePlayerScore.throw_score); 

  }

  // finish round set inactive player active
  const finishRound = () =>{
    
    // if activePlayer is busted, then he chose to end the round in the bust_notice modal
    // so ignore all other checks and end round
    if (activePlayerScore.is_busted === false)
    {
        if (checkIfScoreGreaterOne(activePlayerScore.throw_score) === false)
        {
            roundBustedOnOne();
        }

        if (checkIfAllDartsUsed(currentThrowScores) === false)
        {
            callModal("Bitte alle Pfeile verwenden bevor man die Runde beendet.");
            return false;
        }
    }
    else{
      setActivePlayerScore((prevState)=>({...prevState, 
          round_score: currentThrowScores,
          throw_score: activeStartScore
      }));

    }
    endRound();
  }

  // use effect hook and call endRound if player score is bust, to update playerscore in time
  useEffect(() => {

    if(activePlayerScore.is_busted === true && activePlayerScore.throw_score === activeStartScore)
    {
      endRound();
    }

  })


  // option to revert dart throws in a round
  // defined top level because I want to use it in Modal Windows and InserScorePlanel
  const revertThrow = () => {
    if (currentThrowScores.length > 0)
    {   
        let lastThrow = currentThrowScores.slice(-1);
        // add last throw score to the active player score
        let revertScore = parseInt(activePlayerScore.throw_score,10);
        revertScore += parseInt(lastThrow,10);        
        setActivePlayerScore({...activePlayerScore, 
            throw_score: revertScore,
            is_busted : false
        });
        // delete last throw from currentThrowScores
        currentThrowScores.pop();
        setCurrentThrowScores(currentThrowScores);
        // reset throw count
        setThrowCount(throwCount + 1);
    }
    else
    {
        callModal("Keine Würfe vorhanden zum wiederholen!");
    }
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
    'setActiveView': setActiveView,
    'modalOpen': modalOpen,
    'setModalOpen': setModalOpen,
    'callModal': callModal,
    'revertThrow':revertThrow,
    'finishRound':finishRound,
    'endRound':endRound,
    'modalMessage': modalMessage,
    'setModalMessage': setModalMessage,
    'modalMode':modalMode,
    'setModalMode':setModalMode,
    'checkIfScoreGreaterOne':checkIfScoreGreaterOne,
    'checkIfOvershot':checkIfOvershot,
    'checkIfEndedOnDouble':checkIfEndedOnDouble,
    'roundBustedOnOne':roundBustedOnOne,

    'initialSetValue': initialSetValue,
    'initialLegValue': initialLegValue,
    'setInitialSetValue': setInitialSetValue,
    'setInitialLegValue': setInitialLegValue,
    'setGameType': setGameType,
    'gameType': gameType,

    'setGameSession' : setGameSession,
    'gameSession': gameSession,

    'player1': player1,
    'player2': player2,
    'setPlayer1': setPlayer1,
    'setPlayer2': setPlayer2,
    'sessionPlayers': sessionPlayers,
    'setSessionPlayers': setSessionPlayers,
    'inactivePlayer': inactivePlayer,
    'setInactivePlayer': setInactivePlayer,
    'activePlayer': activePlayer,
    'setActivePlayer': setActivePlayer,
    'setActivePlayerScore': setActivePlayerScore,
    'activeStartScore':activeStartScore,
    'setActiveStartScore':setActiveStartScore,
    'activePlayerScore':activePlayerScore,
    'inactivePlayerScore':inactivePlayerScore,
    'setInactivePlayerScore': setInactivePlayerScore,
    'throwCount': throwCount,
    'setThrowCount': setThrowCount,
    'currentThrowScores': currentThrowScores,
    'setCurrentThrowScores': setCurrentThrowScores,

    'playerRoster': playerRoster,
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
