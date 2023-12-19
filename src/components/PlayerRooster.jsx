import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';


const PlayerRooster = () => {
    const {
        setActivePlayer,
        setInactivePlayer,
        sessionPlayers,
        setSessionPlayers,
        playerRooster,
        setPlayer1,
        setPlayer2} = useContext(AppContext);
    

    const addPlayer = (player) => {
        
        // only allow 2 players in players array
        if (sessionPlayers.length < 2)
        {
            sessionPlayers.push(player);
            setSessionPlayers([...sessionPlayers]);
            // if first player in players array set to activePlayer
            if (sessionPlayers.length === 1)
            {    
                setActivePlayer(sessionPlayers[0]);
                setPlayer1(sessionPlayers[0]);
            }  
            if (sessionPlayers.length === 2)
            {   
                setInactivePlayer(sessionPlayers[1]); 
                setPlayer2(sessionPlayers[1])
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
                <td key={player.player_id}>
                    <Button onClick={()=>{addPlayer(player)}}>

                        <Image className="roosterImage" src={`../../images/${player.player_image}`} alt={`Spieler: ${player.player_name}`} />
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