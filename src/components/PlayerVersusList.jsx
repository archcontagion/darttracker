import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';
import { AppContext } from '../contexts/AppContext';


const PlayerVersusList = () => {

    const {
          sessionPlayers,
          setSessionPlayers,
          setPlayer1,
          setPlayer2,
          player1,
          player2} = useContext(AppContext);


    const removePlayer = (id) => {

      // unset player1 or player2 if it is their id that is being removed
      if (player1.player_id === id)
      {
        setPlayer1({'player_id':'noPlayer_01','name':'','avatar':'noAvatar.png'})
      }

      if (player2.player_id === id)
      {
        setPlayer2({'player_id':'noPlayer_02','name':'','avatar':'noAvatar.png'})
      }

      let index = sessionPlayers.map(item => {
        return item.id;
      }).indexOf(id);
      sessionPlayers.splice(index, 1);
      

      setSessionPlayers([...sessionPlayers]);
    }


    return (

        <div className="playerList">
          <div className="versusArea">
            {player1.player_id !== 'noPlayer_01' ? 
              <div className="versusPlayer first" key={player1.player_id}>
                  <Button className="removeIcon" onClick={()=>{removePlayer(player1.player_id);}}>
                    <Image  src={`../../images/removePlayerIcon.svg`} alt={`Spieler entfernen`} />  
                  </Button>
                <Image className="versusImage" src={`../../images/${player1.player_image}`} alt={`Spieler: ${player1.player_name}`} />
                <div className="versusPlayerName">
                    <h2>{player1.player_name}</h2>
                </div>
                <div className="versusPlayerTitle">
                    <h2>{player1.player_title}</h2>
                </div>
              </div>
            : null}
            <h2 className="versusHeader">VS</h2>
            {player2.player_id !== 'noPlayer_02' ? 
              <div className="versusPlayer second" key={player2.player_id}>
                  <Button className="removeIcon"  onClick={()=>{removePlayer(player2.player_id);}}>
                    <Image src={`../../images/removePlayerIcon.svg`} alt={`Spieler entfernen`} />  
                  </Button>
                <Image className="versusImage" src={`../../images/${player2.player_image}`} alt={`Spieler: ${player2.player_name}`} />
                <div className="versusPlayerName">
                    <h2>{player2.player_name}</h2>
                </div>
                <div className="versusPlayerTitle">
                    <h2>{player2.player_title}</h2>
                </div>
              </div>
            : null}
          </div>
          
        </div>



      );
}

export default PlayerVersusList