import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { AppContext } from '../AppContext';



export const GameType = () => {
  const {setActiveView,
         setGameType,
         setPlayerScore} = useContext(AppContext)
  
  return (
    <div className="game-type">

    <Button className="btn-101" value="101" onClick={(event) => {
      setGameType(event.currentTarget.value);
      setPlayerScore(event.currentTarget.value);
      setActiveView('page-3');
      }}>
      <h2 className="top">
        <div className="firstDiv">
          est.
        </div>
        <div className="secondDiv">
          player<br/>
          leg
        </div>
        <div className="thirdDiv">
          2 min
        </div>
      </h2>  
      <h2>101</h2>
      <h3>Short and sweet</h3>
    </Button>  
    <Button className="btn-301" value="301" onClick={(event) => {
      setGameType(event.currentTarget.value);
      setPlayerScore(event.currentTarget.value);
      setActiveView('page-3');
      }}>
      <h2 className="top">
        <div className="firstDiv">
          est.
        </div>
        <div className="secondDiv">
          player<br/>
          leg
        </div>
        <div className="thirdDiv">
          5 min
        </div>
      </h2>  
      <h2>301</h2>
      <h3>A real challange</h3>
    </Button>  
    <Button className="btn-501" value="501" onClick={(event) => {
      setGameType(event.currentTarget.value);
      setPlayerScore(event.currentTarget.value);
      setActiveView('page-3');
      }}>
      <h2 className="top">
        <div className="firstDiv">
          est.
        </div>
        <div className="secondDiv">
          player<br/>
          leg
        </div>
        <div className="thirdDiv">
          8 min
        </div>
      </h2>   
      <h2>501</h2>
      <h3>like a pro</h3>
    </Button>  
    <Button className="btn-atc" value="ATC" onClick={(event) => {
      alert("WIP: Not yet implemented.");
      // setGameType(event.targcurrentTargetet.value);
      // setPlayerScore(event.currentTarget.value);
      // setActiveView('page-3');
      }}>
      <h2 className="top">
        <div className="firstDiv">
          est.
        </div>
        <div className="secondDiv">
          player<br/>
          leg
        </div>
        <div className="thirdDiv">
          5 min
        </div>
      </h2>  
      <h2>ATC</h2>
      <h3>Around the Clock</h3>
    </Button>  
</div>
  )
}
