import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';
import { AppContext } from '../AppContext';

const PlayerList = () => {

    const {
          players,
          setPlayers,
          setPlayer1,
          setPlayer2,
          player1,
          player2} = useContext(AppContext);


    const removePlayer = (id) => {

      // unset player1 or player2 if it is their id that is being removed
      if (player1.id === id)
      {
        setPlayer1({'id':'noPlayer_01','name':'','avatar':'noAvatar.png'})
      }

      if (player2.id === id)
      {
        setPlayer2({'id':'noPlayer_02','name':'','avatar':'noAvatar.png'})
      }

      let index = players.map(item => {
        return item.id;
      }).indexOf(id);
      players.splice(index, 1);
      

      setPlayers([...players]);
    }


    return (

        <div className="playerList">
          <div className="versusArea">
            <div className="versusPlayer first" key={player1.id}>
            <Button onClick={()=>{removePlayer(player1.id);}}>
              <Image className="versusImage" src={`../../images/${player1.avatar}`} alt={`Spieler: ${player1.name}`} />
              <div className="versusPlayerName">
                    <h2>{player1.name}</h2>
                </div>
                <div className="versusPlayerTitle">
                    <h2>{player1.title}</h2>
                </div>
            </Button>
            </div>
            <h2 className="versusHeader">VS</h2>
            <div className="versusPlayer second" key={player2.id}>
            <Button onClick={()=>{removePlayer(player2.id);}}>
              <Image className="versusImage" src={`../../images/${player2.avatar}`} alt={`Spieler: ${player2.name}`} />
              <div className="versusPlayerName">
                    <h2>{player2.name}</h2>
                </div>
                <div className="versusPlayerTitle">
                    <h2>{player2.title}</h2>
                </div>
            </Button>
            </div>
          </div>
          
        </div>



      );
}

export default PlayerList