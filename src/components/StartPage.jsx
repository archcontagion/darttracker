import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { AppContext } from '../AppContext';

const StartPage = () => {
    const {setActiveView} = useContext(AppContext)
  return (
    <div className="startPage">

        <div className="row">
        </div>
        <div className="row">
            <div className="startPageButtons">        
                <ul>
                    <li className="startPagePlayButton">
                        <Button onClick={()=>{setActiveView('page-2')}}>
                            <h2>Play</h2>
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default StartPage