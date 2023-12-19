import React, { useContext }  from 'react'
import { AppContext } from '../contexts/AppContext';
import InsertScorePanel from './InsertScorePanel';

const Player = (object) => {

 
 // need AppContext because I want to change value un PlayerScore Component  
  const {activePlayer,
        activePlayerScore,
        inactivePlayer,
        inactivePlayerScore,
        throwCount,
        currentThrowScores,
        gameType
        } = useContext(AppContext);  

    
  // TODO
  // sets, legs and active status of player 


  return (
    <div className={`playerCard${object.player.player_id === activePlayer.player_id ? " active" : " inactive"}`} id={activePlayer.player_id}>
        <div className="row topRow">
            <div className="playerHead">
                <div className="playerImages">
                    {object.player.player_id === activePlayer.player_id ? 
                    <img className="avatarImage active" src={`../../images/${activePlayer.player_image}`} alt={`Player: ${activePlayer.player_name}`} />
                    : 
                    <img className="avatarImage" src={`../../images/${inactivePlayer.player_image}`} alt={`Player: ${inactivePlayer.player_name}`} />                    
                    }
                    {object.player.player_id === activePlayer.player_id ? 
                    <span className="inactivePlayerScore">{inactivePlayerScore.throw_score}</span>
                    : 
                    null               
                    }
                </div>
                <div className="playerName">
                    <h2>{activePlayer.player_name}</h2>
                </div>
                <div className="playerTitle">
                    <h2>{activePlayer.player_title}</h2>
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
                        : <img className="arrowIcon" src={"../../images/dart.svg"} alt={`Player: ${activePlayer.player_name}`} />}
                        </li>
                        <li>
                        {throwCount < 3?       
                        <p className="currentThrowScore">{currentThrowScores[0]} </p> 
                        : <img className="arrowIcon" src={"../../images/dart.svg"} alt={`Player: ${activePlayer.player_name}`} />}
                        </li>                
                    </ul>
                    <div id={activePlayer.id} className="playerScore">
                        <em className="gameTypeRoofLine">{gameType}</em>
                        <h3>{activePlayerScore.throw_score}</h3>
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