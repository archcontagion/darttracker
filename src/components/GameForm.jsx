import React, { useContext, useEffect } from 'react'
import { AppContext } from '../contexts/AppContext';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import PlayerVersusList from './PlayerVersusList';
import axios from '../axios';

import PlayerRooster from './PlayerRooster';


const GameForm = () => {
    const {activePlayer,
           setActivePlayerScore,
           inactivePlayer,
           setInactivePlayerScore, 
           sets,
           legs, 
           gameType,
           setActiveView,
           gameSession, 
           setGameSession, 
           sessionPlayers} = useContext(AppContext);

    // startGameSession wird im useEffect ausgefuehrt und createScores wird erst mit dem Submit Handler ausgefuehrt
    async function startGameSession() {
      axios.post('/api/sessions').then( response => {
        setGameSession(response.data);
        } )
        .catch( ( error ) => {
        console.log( error );
        } );
        return true;
    }

    async function createScoresandSetView() {
      // Score Objekte fuer beide Spieler erstellen für diese Gamesession 
      // activePlayer score object
      axios.post('/api/scores',
        {'rounds': 0,
        'sets':sets,
        'legs':legs,
        'throwscore':gameType,
        'throws': 0,
        'sessionid': gameSession.id,
        'playerid': activePlayer.player_id
      }).then( response => {
        setActivePlayerScore(response.data);
      } )
      .catch( ( error ) => {
      console.log( error );
      } );
      
      // inactivePlayer score object
      axios.post('/api/scores',
        {'rounds': 0,
        'sets':sets,
        'legs':legs,
        'throwscore':gameType,
        'throws': 0,
        'sessionid': gameSession.id,
        'playerid': inactivePlayer.player_id
      }).then( response => {
        setInactivePlayerScore(response.data);
      } )
      .then(response => {
        setActiveView('page-4')
      })
      .catch( ( error ) => {
      console.log( error );
      } );
    }

    // wird sofort ausgefuehrt damit die session id vorhanden ist wenn man die score objekte erstellt  
    useEffect(() => {
      startGameSession();      
    }, [])

    const handleSubmit = (event)=> {
        event.preventDefault();
        if (sessionPlayers.length < 2)
        {
            document.getElementsByClassName('infoStart')[0].style.display = "block"; 
        }
        else {
            document.getElementsByClassName('infoStart')[0].style.display = "none"; 
            createScoresandSetView();
          }
    }

    return (
      <div className="gameFormPage">
        <div className="game-form">
          <div className="row textLeft thinRow">
            <Button className="back-link" onClick={()=>{setActiveView('page-2');}}>
                <Image src={`../../images/ion_arrow-back.svg`}></Image>
            </Button>
          </div>
          <div className="row">
            <PlayerVersusList></PlayerVersusList>
            
            <PlayerRooster></PlayerRooster>

            <Form onSubmit={handleSubmit}>
            <Button className="playButton" type="submit">
              <h2>Spiel starten</h2>
              <Image className="playButton" src={`../../images/playButton.png`} alt={`Spiel starten`} />
            </Button>
            <div className="infoStart" style={{display:'none', color:'white'}}>Please enter at least two players, in order to start the game.</div>
            <br/>
            </Form>
          </div>
        </div>
      </div>
    )
}

export default GameForm