import React, { useContext }  from 'react'
import Player from './Player';
import { AppContext } from '../contexts/AppContext';


// the active game session
const GameSession = () => {
  const {sessionPlayers} = useContext(AppContext);
 


  return (
    <div id="page-2" className="page">
        <div className="playerBoard">          
          {sessionPlayers.map(player => (
                // if first player and playerStatus = false, change to true to make player active
                <Player key={player.player_id} player={player}></Player>
              ))}
        </div>  
        <br/>
        <div>

        </div>
    </div>

  )
}

export default GameSession