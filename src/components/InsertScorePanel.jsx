import React, {useContext} from 'react'
import Button from 'react-bootstrap/Button';
import { AppContext } from '../AppContext';

const InsertScorePanel = () => {

    // 1 Miss Button,1 Bullseye Button, 1 double Bullseye   
    const topButtons = [{id:'top_1', value: 0, label: 'Miss'},
                        {id:'top_2', value: 25,label:'Bull'},
                        {id:'top_3', value: 50, label:'Bull ..'}   
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

    const {setActiveView,
        //    setOpenModal, 
        //    setModalMessage,
           setPlayerScore,
           activePlayer,
           inactivePlayer,
           setActivePlayer,
           setInactivePlayer,
           setThrowCount,
           setCurrentThrowScores,
           throwCount} = useContext(AppContext);  
                       
  // finish round set inactive player active
  const finishRound = () =>{
    setThrowCount(3);
    setCurrentThrowScores([]);
    setInactivePlayer(activePlayer);
    setActivePlayer(inactivePlayer);
    setPlayerScore(inactivePlayer.score);    
  }


  // check if score is bust
  // check if last throw was double if score is zero
  const checkIfEndedOnDouble = (score,subtractScore,type)=>{   

    if (score - subtractScore === 0 && type !== 'double')
    {
        return false;
    }
    return true;
  }

  const checkIfOvershot = (score,subTractScore) => {

    if (score - subTractScore < 0)
    {
        return false;
    }
    return true;
  }

  const callModal = (message) => {
    // setModalMessage(message);
    // setOpenModal(true);
    alert(message);
  }
  // with each dart thrown subtract from active player score
  const subTractScore = (value,type) => {

  let newScore = value;

        if(checkIfEndedOnDouble(activePlayer.score, newScore,type) === false)
        {
            callModal("Nicht mit Double beendet.");
        }   

        if (checkIfOvershot(activePlayer.score, newScore) === false)
        {
            callModal("Über das Ziel hinausgeschossen.");

        }

        setPlayerScore(activePlayer.score -= value);
        // batch into array with function to push new dart score to the array
        // to display the single score points of every dart in a leg
        
        setCurrentThrowScores(currentThrowScores => [...currentThrowScores,newScore]);

        
        setThrowCount (throwCount-1);
       
  }                   

                        
  return (
    <div className="playerControls">
        <table className="topTable">
            <tbody>
                <tr>
                {topButtons.map((item, index) => (
                    <td  className="topButtons" key={item.id}>
                    {/* If it is the last button, than designate call with param 'triple' */}
                    <Button name={item.value} disabled={throwCount === 0} value={item.value} onClick={()=>{index === 3 ? subTractScore(item.value,'triple') : subTractScore(item.value,'');}}>
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
                Button name={item.value} value={item.value} disabled={throwCount === 0} onClick={()=>{subTractScore(item.value,'single');}}>
                {item.label}
                </Button></td>
            ))}
            </tr>
            <tr>
            {mainButtonsRow_2.map((item) => (
                <td className="mainButtons" key={item.id}><
                Button name={item.value} value={item.value} disabled={throwCount === 0} onClick={()=>{subTractScore(item.value,'single');}}>
                {item.label}
                </Button></td>
            ))}
            </tr>
            <tr>
            {mainButtonsRow_1.map((item) => (
                <td className="mainButtonsDouble" key={item.id}>
                    <Button name={`d${item.value}`} disabled={throwCount === 0} value={item.value*2} onClick={()=>{subTractScore(item.value*2,'double');}}>
                        <span>{item.label}</span>
                        <span>..</span>
                    </Button>
                </td>
            ))}
            </tr>
            <tr>
            {mainButtonsRow_2.map((item) => (
                <td className="mainButtonsDouble" key={item.id}>
                    <Button name={`d${item.value}`} disabled={throwCount === 0} value={item.value*2} onClick={()=>{subTractScore(item.value*2,'double');}}>
                        <span>{item.label}</span>
                        <span>..</span>
                    </Button>
                </td>
            ))}
            </tr>
            <tr>
            {mainButtonsRow_1.map((item) => (
                <td className="mainButtonsTriple" key={item.id}>
                    <Button name={`t${item.value}`} disabled={throwCount === 0} value={item.value*3} onClick={()=>{subTractScore(item.value*3,'triple');}}>
                        <span>{item.label}</span>
                        <span>...</span>
                    </Button>
                </td>
            ))}
            </tr>
            <tr>
            {mainButtonsRow_2.map((item) => (
                <td className="mainButtonsTriple" key={item.id}>
                    <Button name={`t${item.value}`} disabled={throwCount === 0} value={item.value*3} onClick={()=>{subTractScore(item.value*3,'triple');}}>
                        <span>{item.label}</span>
                        <span>...</span>
                    </Button>
                </td>
            ))}
            </tr>
            </tbody>
        </table>

        <h3 className="headingChangeView">
            <Button onClick={(event)=>{event.preventDefault();setActiveView('page-1');}}>Ansicht wechseln</Button> 
        </h3>

    

        <Button onClick={()=>{finishRound()}} className="endGame" id="endGame">                
            <span>Runde beenden</span>
        </Button>
    </div>
  )
}

export default InsertScorePanel