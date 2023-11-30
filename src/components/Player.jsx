import React, { useState }  from 'react'
import Button from 'react-bootstrap/esm/Button';


const Player = (obj) => {


  const [playScore, setPlayerScore] = useState(obj.player.score);
  const [throwCount, setThrowCount] = useState(3);


  // TODO
  // sets, legs and active status of player 

  // with each dart thrown subtract from active player score
  const subTractScore = (value) => {
        
        if (obj.player.score >= value)
        {
            setPlayerScore(obj.player.score -= value);
        }
        document.getElementById(`${obj.player.id}_score`).value='';
        setThrowCount (throwCount-1);
         
  }

  return (
    <div className="playerCard" id={obj.player.id}>
        <div className="playerName">
            <h2>{obj.player.name}</h2>
        </div>
        <div className="playerStats">
            <h3>{playScore}</h3>
            <ul className="throwsCount">
                <li className={throwCount < 1 ? 'usedThrow' : null}></li>
                <li className={throwCount < 2 ? 'usedThrow' : null}></li>
                <li className={throwCount < 3 ? 'usedThrow' : null}></li>
            </ul>

            <input id={`${obj.player.id}_score`} type="text" className="scoreInput"></input>
            <br/>
            <Button disabled={throwCount === 0} className="throwScore" onClick={()=>{subTractScore(document.getElementById(`${obj.player.id}_score`).value)}} variant='primary'>Throw dart!</Button> 
        </div>
    </div>
  )
}

export default Player