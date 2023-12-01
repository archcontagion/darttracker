import React, { useState, useContext }  from 'react'
import Button from 'react-bootstrap/esm/Button';
import { AppContext } from '../AppContext';

const Player = (object) => {

 // 1 Miss Button,1 Bullseye Button, 1 double Bullseye   
 const topButtons = [{id:1, value: 0, label: 'Miss'},
                     {id:2, value: 50,label:'Bull'},
                     {id:3, value: 100, label:'Bull ..'}   
                    ];
 const mainButtons = [{id:4, value:1, label:1},
                      {id:5, value:2, label:2},
                      {id:6, value:3, label:3},
                      {id:7, value:4, label:4},
                      {id:8, value:5, label:5},                        
                      {id:9, value:6, label:6},
                      {id:10, value:7, label:7},                        
                      {id:11, value:8, label:8},
                      {id:12, value:9, label:9},                        
                      {id:13, value:10, label:10},
                      {id:14, value:11, label:11},                        
                      {id:15, value:12, label:12},
                      {id:16, value:13, label:13},                        
                      {id:17, value:14, label:14},
                      {id:18, value:15, label:15},                        
                      {id:19, value:16, label:16},
                      {id:20, value:17, label:17},
                      {id:21, value:18, label:18},
                      {id:22, value:19, label:19},
                      {id:20, value:20, label:20} 
                     ];

 // need AppContext because I want to change value un PlayerScore Component  
  const {playerScore,
        setPlayerScore,
        players} = useContext(AppContext);  

  const [playerStatus, setPlayerStatus]= useState(object.player.playerStatus);
  const [throwCount, setThrowCount] = useState(3);
  const [currentThrowScores, setCurrentThrowScores] = useState([]);
  



  // TODO
  // sets, legs and active status of player 

  // with each dart thrown subtract from active player score
  const subTractScore = (value) => {
        
        if (object.player.score >= value)
        {   let newScore = document.getElementById(`${object.player.id}_score`).value;
            setPlayerScore(object.player.score -= value);
            // batch into array with function to push new dart score to the array
            // to display the single score points of every dart in a leg
            setCurrentThrowScores(currentThrowScores => [...currentThrowScores,newScore])
        }
        document.getElementById(`${object.player.id}_score`).value='';        
        setThrowCount (throwCount-1);

         
  }

  return (
    <div className={`playerCard${playerStatus ? " active" : " inactive"}`} id={object.player.id}>

        {playerStatus ? 
        <img src={"../../images/Philipp_1.png"} alt="`Player: ${object.player.name}`" />
         : 
        <img src={"../../images/Philipp_1_inactive.png"} alt="`Player: ${object.player.name}`" />
        }
        

        <div className="playerName">
            <h2>{object.player.name}</h2>
        </div>
        <div className="playerTitle">
            <h2>{object.player.title}</h2>
        </div>
        <div className="playerStats">

            <ul className="throwsCount">
                <li>
                {throwCount < 1?       
                  <p class="currentThrowScore">{currentThrowScores[2]} </p>
                : <img className="arrowIcon" src={"../../images/dart.svg"} alt="A dart svg icon" />}
                </li>
                <li>
                {throwCount < 2?       
                  <p className="currentThrowScore">{currentThrowScores[1]} </p>
                : <img className="arrowIcon" src={"../../images/dart.svg"} alt="`Player: ${object.player.name}`" />}
                </li>
                <li>
                {throwCount < 3?       
                  <p className="currentThrowScore">{currentThrowScores[0]} </p> 
                : <img className="arrowIcon" src={"../../images/dart.svg"} alt="`Player: ${object.player.name}`" />}
                </li>
            </ul>
            <div class="controlPanel">
                <ul class="topButtons">
                    {topButtons.map(item => (
                        <li key={item.id}>
                        <Button name={item.name} value={item.value} onClick={()=>{subTractScore(item.value);}}>
                        {item.label}
                        </Button></li>
                    ))}
                </ul>
                 <ul class="mainButtons">
                    {mainButtons.map(item => (
                        <li key={item.id}><
                        Button name={item.name} value={item.value} onClick={()=>{subTractScore(item.value);}}>
                        {item.label}
                        </Button></li>
                    ))}
                </ul>
                <ul class="mainButtonsDouble">
                    {mainButtons.map(item => (
                        <li key={item.id}>
                            <Button name={item.name} value={item.value*2} onClick={()=>{subTractScore(item.value*2);}}>
                                <p>{item.label}</p>
                                <p>..</p>
                            </Button>
                        </li>
                    ))}
                </ul>
                <ul class="mainButtonsTriple">
                    {mainButtons.map(item => (
                        <li key={item.id}>
                            <Button name={item.name} value={item.value*3} onClick={()=>{subTractScore(item.value*3);}}>
                                <p>{item.label}</p>
                                <p>...</p>
                            </Button>
                        </li>
                    ))}
                </ul>
                <Button class="endGame" id="endGame">                
                    <span>Runde beenden</span>
                </Button>
            </div>
            <input id={`${object.player.id}_score`} type="text" className="scoreInput"></input>
            <br/>
            <Button disabled={throwCount === 0} className="throwScore" onClick={()=>{subTractScore(document.getElementById(`${object.player.id}_score`).value)}} variant='primary'>Throw dart!</Button> 

        </div>
    </div>
  )
}

export default Player