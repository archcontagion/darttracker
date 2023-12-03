import React, { useState, useContext }  from 'react'
import Button from 'react-bootstrap/esm/Button';
import { AppContext } from '../AppContext';

const Player = (object) => {

 // 1 Miss Button,1 Bullseye Button, 1 double Bullseye   
 const topButtons = [{id:'top_1', value: 0, label: 'Miss'},
                     {id:'top_2', value: 50,label:'Bull'},
                     {id:'top_3', value: 100, label:'Bull ..'}   
                    ];
 const mainButtonsRow_1 = [{id:'m_4', value:1, label:1},
                      {id:'m_5', value:2, label:2},
                      {id:'m_6', value:3, label:3},
                      {id:'m_7', value:4, label:4},
                      {id:'m_8', value:5, label:5},                        
                      {id:'m_9', value:6, label:6},
                      {id:'m_10', value:7, label:7},                        
                      {id:'m_11', value:8, label:8},
                      {id:'m_12', value:9, label:9},                        
                      {id:'m_13', value:10, label:10},
                     ];

const mainButtonsRow_2 = [
                     {id:'m_14', value:11, label:11},                        
                     {id:'m_15', value:12, label:12},
                     {id:'m_16', value:13, label:13},                        
                     {id:'m_17', value:14, label:14},
                     {id:'m_18', value:15, label:15},                        
                     {id:'m_19', value:16, label:16},
                     {id:'m_20', value:17, label:17},
                     {id:'m_21', value:18, label:18},
                     {id:'m_22', value:19, label:19},
                     {id:'m_23', value:20, label:20} 
                    ];

 // need AppContext because I want to change value un PlayerScore Component  
  const {setActiveView,
        playerScore,
        setPlayerScore,
        activePlayer,
        setActivePlayer,
        players} = useContext(AppContext);  


  const [throwCount, setThrowCount] = useState(3);
  const [currentThrowScores, setCurrentThrowScores] = useState([]);
  



  // TODO
  // sets, legs and active status of player 

  // get inactive player
  let inactivePlayer = players.filter((player)=>{
        if (activePlayer !== player.id)
        {
            return player;
        }
  });
  // finish round set inactive player active
  const finishRound = () =>{
    setThrowCount(3);
    setCurrentThrowScores([]);
    setActivePlayer(inactivePlayer[0].id);
    setPlayerScore(inactivePlayer[0].score);    
  }
  // with each dart thrown subtract from active player score
  const subTractScore = (value) => {

        if (object.player.score >= value)
        {   let newScore = value;
            setPlayerScore(object.player.score -= value);
            // batch into array with function to push new dart score to the array
            // to display the single score points of every dart in a leg
            setCurrentThrowScores(currentThrowScores => [...currentThrowScores,newScore]);

        }
        setThrowCount (throwCount-1);
       
  }







  return (
    <div className={`playerCard${object.player.id === activePlayer ? " active" : " inactive"}`} id={activePlayer}>
        <div className="row topRow">
            <div className="playerHead">
                <div className="playerImages">
                    {object.player.id === activePlayer ? 
                    <img className="avatarImage active" src={`../../images/${object.player.avatar}`} alt={`Player: ${activePlayer[0].name}`} />
                    : 
                    <img className="avatarImage" src={`../../images/${inactivePlayer[0].avatar}`} alt={`Player: ${inactivePlayer[0].name}`} />                    
                    }
                    {object.player.id === activePlayer ? 
                    <span className="inactivePlayerScore">{inactivePlayer[0].score}</span>
                    : 
                    null               
                    }
                </div>
                <div className="playerName">
                    <h2>{activePlayer[0].name}</h2>
                </div>
                <div className="playerTitle">
                    <h2>{activePlayer[0].title}</h2>
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
                        : <img className="arrowIcon" src={"../../images/dart.svg"} alt="`Player: ${object.player.name}`" />}
                        </li>
                        <li>
                        {throwCount < 3?       
                        <p className="currentThrowScore">{currentThrowScores[0]} </p> 
                        : <img className="arrowIcon" src={"../../images/dart.svg"} alt="`Player: ${object.player.name}`" />}
                        </li>                
                    </ul>
                    <div id={activePlayer[0].id} className="playerScore">{playerScore}</div> 
                </div>
            </div>
        </div>
        <div className="row">
            <div className="playerControls">
                    <table className="topTable">
                        <tbody>
                            <tr>
                            {topButtons.map(item => (
                                <td  className="topButtons" key={item.id}>
                                <Button name={item.value} disabled={throwCount === 0} value={item.value} onClick={()=>{subTractScore(item.value);}}>
                                {item.label}
                                </Button></td>
                            ))}                        
                            </tr>
                        </tbody>
                    </table>
                    <table>   
                        <tbody> 
                        <tr>
                        {mainButtonsRow_1.map((item) => (
                            <td className="mainButtons" key={item.id}><
                            Button name={item.value} value={item.value} disabled={throwCount === 0} onClick={()=>{subTractScore(item.value);}}>
                            {item.label}
                            </Button></td>
                        ))}
                        </tr>
                        <tr>
                        {mainButtonsRow_2.map((item) => (
                            <td className="mainButtons" key={item.id}><
                            Button name={item.value} value={item.value} disabled={throwCount === 0} onClick={()=>{subTractScore(item.value);}}>
                            {item.label}
                            </Button></td>
                        ))}
                        </tr>
                        <tr>
                        {mainButtonsRow_1.map((item) => (
                            <td className="mainButtonsDouble" key={item.id}>
                                <Button name={`d${item.value}`} disabled={throwCount === 0} value={item.value*2} onClick={()=>{subTractScore(item.value*2);}}>
                                    <span>{item.label}</span>
                                    <span>..</span>
                                </Button>
                            </td>
                        ))}
                        </tr>
                        <tr>
                        {mainButtonsRow_2.map((item) => (
                            <td className="mainButtonsDouble" key={item.id}>
                                <Button name={`d${item.value}`} disabled={throwCount === 0} value={item.value*2} onClick={()=>{subTractScore(item.value*2);}}>
                                    <span>{item.label}</span>
                                    <span>..</span>
                                </Button>
                            </td>
                        ))}
                        </tr>
                        <tr>
                        {mainButtonsRow_1.map((item) => (
                            <td className="mainButtonsTriple" key={item.id}>
                                <Button name={`t${item.value}`} disabled={throwCount === 0} value={item.value*3} onClick={()=>{subTractScore(item.value*3);}}>
                                    <span>{item.label}</span>
                                    <span>...</span>
                                </Button>
                            </td>
                        ))}
                        </tr>
                        <tr>
                        {mainButtonsRow_2.map((item) => (
                            <td className="mainButtonsTriple" key={item.id}>
                                <Button name={`t${item.value}`} disabled={throwCount === 0} value={item.value*3} onClick={()=>{subTractScore(item.value*3);}}>
                                    <span>{item.label}</span>
                                    <span>...</span>
                                </Button>
                            </td>
                        ))}
                        </tr>
                        </tbody>
                    </table>

                    <h3 className="headingChangeView">
                        <a href="#" onClick={(event)=>{event.preventDefault();setActiveView('page-1');}}>Ansicht wechseln</a> 
                    </h3>

                   

                    <Button onClick={()=>{finishRound()}} className="endGame" id="endGame">                
                        <span>Runde beenden</span>
                    </Button>
            </div>
        </div>
        
    </div>
  )
}

export default Player