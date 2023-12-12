import React, { useContext }  from 'react'
import { AppContext } from '../AppContext';
import InsertScorePanel from './InsertScorePanel';

const Player = (object) => {

 
 // need AppContext because I want to change value un PlayerScore Component  
  const {playerScore,
        activePlayer,
        inactivePlayer,
        throwCount,
        currentThrowScores,
        gameType
        } = useContext(AppContext);  


  // TODO
  // sets, legs and active status of player 


  return (
    <div className={`playerCard${object.player.id === activePlayer.id ? " active" : " inactive"}`} id={activePlayer.id}>
        <div className="row topRow">
            <div className="playerHead">
                <div className="playerImages">
                    {object.player.id === activePlayer.id ? 
                    <img className="avatarImage active" src={`../../images/${activePlayer.avatar}`} alt={`Player: ${activePlayer.name}`} />
                    : 
                    <img className="avatarImage" src={`../../images/${inactivePlayer.avatar}`} alt={`Player: ${inactivePlayer.name}`} />                    
                    }
                    {object.player.id === activePlayer.id ? 
                    <span className="inactivePlayerScore">{inactivePlayer.score}</span>
                    : 
                    null               
                    }
                </div>
                <div className="playerName">
                    <h2>{activePlayer.name}</h2>
                </div>
                <div className="playerTitle">
                    <h2>{activePlayer.title}</h2>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="playerStats">
                <div className="centerStats">
                    <ul className="throwsCount">
                        <li>
                        {throwCount < 1?       
                        <p className="currentThrowScore">{currentThrowScores[2]} </p>
                        : <img className="arrowIcon" src={"../../images/dart.svg"} alt="A dart svg icon" />}
                        </li>
                        <li>
                        {throwCount < 2?       
                        <p className="currentThrowScore">{currentThrowScores[1]} </p>
                        : <img className="arrowIcon" src={"../../images/dart.svg"} alt={`Player: ${activePlayer.name}`} />}
                        </li>
                        <li>
                        {throwCount < 3?       
                        <p className="currentThrowScore">{currentThrowScores[0]} </p> 
                        : <img className="arrowIcon" src={"../../images/dart.svg"} alt={`Player: ${activePlayer.name}`} />}
                        </li>                
                    </ul>
                    <div id={activePlayer.id} className="playerScore">
                        <em className="gameTypeRoofLine">{gameType}</em>
                        <h3>{playerScore}</h3>
                    </div> 
                </div>
            </div>
        </div>
        <div className="row">
            <InsertScorePanel></InsertScorePanel>
        </div>
        
    </div>
  )
}

export default Player