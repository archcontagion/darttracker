import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { AppContext } from '../AppContext';

const PlayerList = () => {

    const {players} = useContext(AppContext);

    return (
        <ul className="playerList">
          {players.map(player => (
            <li key={player.id}><div><p>{player.name}</p><Button variant="danger">-</Button></div></li>
          ))}
        </ul>

      );
}

export default PlayerList