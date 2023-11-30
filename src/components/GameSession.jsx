import React, { useContext }  from 'react'
import Button from 'react-bootstrap/esm/Button'
import Player from './Player';
import { AppContext } from '../AppContext';

// the active game session
const GameSession = () => {
  const {setActiveView,
         players} = useContext(AppContext);
 


  return (
    <div id="page-2" className="page">
      <div>GameSession</div>
      <div className="playerBoard">
      {players.map(player => (
            <Player player={player}></Player>
          ))}
      </div>  
      <br/>  
      <Button onClick={()=>{setActiveView('page-1')}}>Back to Homepage</Button>
    </div>
  )
}

export default GameSession