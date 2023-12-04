import React, { useContext } from 'react'
import { AppContext } from '../AppContext';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';


const PlayerRooster = () => {
    const {
        setActivePlayer,
        setInactivePlayer,
        players,
        setPlayers,
        playerRooster,
        setPlayer1,
        setPlayer2} = useContext(AppContext);
    

    const addPlayer = (player) => {
        
        // only allow 2 players in players array
        if (players.length < 2)
        {
            players.push(player);
            setPlayers([...players]);
            // if first player in players array set to activePlayer
            if (players.length === 1)
            {
                setActivePlayer(players[0]);
                setPlayer1(players[0]);
            }  
            if (players.length === 2)
            {
                setInactivePlayer(players[1]);
                setPlayer2(players[1])
            } 
        }    
    }

    // split player rooster into 5 entries per row
    const chunk = (arr, size) => 
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );
    const playerRoosterRows = chunk(playerRooster, 5);

    return (
        <table className="playerRooster">
            <tbody>
            {playerRoosterRows.map((array, index)=>{
                return (
                <tr key={index}>                  
                {array.map((player, index) => {
                return (
                <td key={index}>
                    <Button onClick={()=>{addPlayer(player)}}>
                        <Image className="roosterImage" src={`../../images/${player.avatar}`} alt={`Spieler: ${player.name}`} />
                    </Button>
                </td>
                )
                })}
                </tr>
                )
            })}
                
            </tbody>
        </table>
    )
}

export default PlayerRooster