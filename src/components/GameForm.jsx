import React, { useContext } from 'react'
import { AppContext } from '../AppContext';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import PlayerVersusList from './PlayerVersusList';


import PlayerRooster from './PlayerRooster';

const GameForm = () => {
    const {setActiveView,
           players} = useContext(AppContext);

    const handleSubmit = (event)=> {
        event.preventDefault();
        if (players.length < 2)
        {
            document.getElementsByClassName('infoStart')[0].style.display = "block"; 
        }
        else {
            document.getElementsByClassName('infoStart')[0].style.display = "none"; 
            setActiveView('page-4');
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