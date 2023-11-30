import React, { useContext } from 'react'
import { AppContext } from '../AppContext';



export const GameType = () => {
  const {gameType,setGameType} = useContext(AppContext)
  
  return (
    <div className="game-type">
    <input type="radio"
     name="gameType"
     id="game-1"
     checked={gameType === 101 ? 'checked' : null}
     onChange={(e) => {setGameType(e.target.value)}}
     value="101" />
    <label htmlFor="game-1">101</label>

    <input type="radio"
     name="gameType"
     id="game-2"
     checked={gameType === 301 ? 'checked' : null}
     onChange={(e) => {setGameType(e.target.value)}} value="301" />
    <label htmlFor="game-2">301</label>

    <input type="radio"
     name="gameType"
     id="game-3"
     checked={gameType === 501 ? 'checked' : null}
     onChange={(e) => {setGameType(e.target.value)}} value="501" />
    <label htmlFor="game-3">501</label>

    <input type="radio"
     name="gameType"
     id="game-4"
     checked={gameType === 701 ? 'checked' : null}
     onChange={(e) => {setGameType(e.target.value)}} value="701" />
    <label htmlFor="game-4">701</label>

    <input type="radio"
     name="gameType"
     id="game-5"
     checked={gameType === 1001 ? 'checked' : null}
     onChange={(e) => {setGameType(e.target.value)}} value="1001" />
    <label htmlFor="game-5">1001</label>
    <br/><br/>
    <p>Set Gametype: {gameType}</p>
</div>
  )
}
