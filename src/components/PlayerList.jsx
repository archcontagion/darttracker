import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { AppContext } from '../AppContext';

const PlayerList = () => {

    const {players,setPlayers} = useContext(AppContext);

    
    const removePlayer = (id) => {

      let index = players.map(item => {
        return item.id;
      }).indexOf(id);


      players.splice(index, 1);
      if (players.length === 0)
      {
        setPlayers([]);
      }
      else
      {
        setPlayers([...players]);
      }
    }

    return (
        <ul className="playerList">
          {players.map(player => (
            <li key={player.id}><div><p>{player.name}</p><Button onClick={()=>{removePlayer(player.id);}}>-</Button></div></li>
          ))}
        </ul>

      );
}

export default PlayerList