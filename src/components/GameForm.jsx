import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import PlayerVersusList from './PlayerVersusList';
import axios from '../axios';
import PlayerRoster from './PlayerRoster';
import Modal from './Modal';



const GameForm = () => {
    const {modalOpen,
           setModalOpen,
           modalMessage,
           setModalMessage,
           modalMode,
           initialSetValue,
           initialLegValue, 
           activePlayer,
           setActivePlayerScore,
           setActiveStartScore,
           inactivePlayer,
           setInactivePlayerScore, 
           gameType,
           setActiveView,
           gameSession, 
           setGameSession, 
           sessionPlayers} = useContext(AppContext);
    
      
    // create winnerstats json object based on initalSetValue und initialLegValue
    const createWinnersStatsObject = () => {
      let setArray = [];
      let legArray = [];

      for (let index=0;index < initialLegValue;index++)
      {
        legArray.push({"winner": ""});        
      }

      for(let index=0;index < initialSetValue;index++)
      {
        setArray.push({"winner": "", "legs": legArray})
      }

      return setArray;
    }  

           
    // startGameSession wird ausgefuehrt und danach createScores damit session_id vorhanden ist
    function startGameSession() {
      // if gamesession is an empty object
      if (Object.keys(gameSession).length === 0) 
      {
        // send winners_stats object with post request
        let bodyFormData = new FormData();

        let winnersStatsObject = createWinnersStatsObject();
        bodyFormData.append('winners_stats',JSON.stringify(winnersStatsObject));

        //set Session active ()
        bodyFormData.append('is_active',1);

        axios.post('/api/sessions', bodyFormData).then( response => {
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
        // save start score of active player, to be able to reset score back in case of busted score
        setActiveStartScore(gameType); 
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
          setModalMessage('Please enter at least two players, in order to start the game.');
          setModalOpen(true);
        }
        else {
            setModalMessage('');
            setModalOpen(false);
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
            
            <PlayerRoster></PlayerRoster>

            <Form onSubmit={handleSubmit}>
            <Button className="playButton" type="submit">
              <h2>Spiel starten</h2>
              <Image className="playButton" src={`../../images/playButton.png`} alt={`Spiel starten`} />
            </Button>            
            {modalOpen && <Modal modalMode={modalMode} setModalOpen={setModalOpen}>{modalMessage}</Modal>} 
            <br/>
            </Form>
          </div>
        </div>
      </div>
    )
}

export default GameForm