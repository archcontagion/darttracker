import React, { useContext }  from 'react'
import { AppContext } from '../AppContext';


const PlayerScore = (object) => {
  const {playerScore} = useContext(AppContext);

  return (
      <h3 id={object.player.id} className="playerScore">{playerScore}</h3> 
  )
}

export default PlayerScore