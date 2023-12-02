import React, { useContext }  from 'react'
import Button from 'react-bootstrap/esm/Button'
import Player from './Player';
import PlayerScore from './PlayerScore';
import { AppContext } from '../AppContext';

// the active game session
const GameSession = () => {
  const {setActiveView, 
         players} = useContext(AppContext);
 


  return (
    <div id="page-2" className="page">

        <div className="playerBoard">
          {players.map(player => (
                // if first player and playerStatus = false, change to true to make player active
                <Player key={player.id} player={player}></Player>
              ))}
        </div>  
        <br/>  
      </div>

  )
}

export default GameSession