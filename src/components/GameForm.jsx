import React, { useContext } from 'react'
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
           gameType,
           setActiveView,
           gameSession, 
           setGameSession, 
           sessionPlayers} = useContext(AppContext);
    


    // startGameSession wird ausgefuehrt und danach createScores damit session_id vorhanden ist
    function startGameSession() {

      if (gameSession === undefined) 
      {
      axios.post('/api/sessions').then( response => {
          let resData = response.data;
          setGameSession(resData);
          return response.data;
        })
        .then(data => {
          createScoresandSetView(data.id)
        })    
        .catch( ( error ) => {
          console.log( error );
        } );
        return true;
      }    
    }


    function createScoresandSetView(gamesession_id) {
      // Score Objekte fuer beide Spieler erstellen für diese Gamesession 
      // activePlayer score object
      axios.post('/api/scores',
        {'round_number': 0,
        'set_number':0,
        'leg_number':0,
        'throw_score':gameType,
        'throw_number': 0,
        'session_id': gamesession_id,
        'player_id': activePlayer.player_id
      }).then( response => {
        setActivePlayerScore(response.data);
      } )
      .catch( ( error ) => {
      console.log( error );
      } );
      
      // inactivePlayer score object
      axios.post('/api/scores',
        {'round_number': 0,
        'set_number':0,
        'leg_number':0,
        'throw_score':gameType,
        'throw_number': 0,
        'session_id': gamesession_id,
        'player_id': inactivePlayer.player_id
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


    const handleSubmit = (event)=> {
        event.preventDefault();
        if (sessionPlayers.length < 2)
        {
            document.getElementsByClassName('infoStart')[0].style.display = "block"; 
        }
        else {
            document.getElementsByClassName('infoStart')[0].style.display = "none"; 
            startGameSession();      
            
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