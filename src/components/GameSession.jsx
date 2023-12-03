import React, { useContext }  from 'react'
import Player from './Player';
import { AppContext } from '../AppContext';

// the active game session
const GameSession = () => {
  const {players} = useContext(AppContext);
 


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