import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';
import { AppContext } from '../contexts/AppContext';
import { GameTypeComponent } from './GameTypeComponent';

const GameTypePage = () => {
    const {setActiveView} = useContext(AppContext)

    return (
        <div className="gameTypePage">
            <div className="row textLeft">
            <Button className="back-link" onClick={()=>{setActiveView('page-1');}}>
                <Image src={`../../images/ion_arrow-back.svg`}></Image>
            </Button>
            </div>
            <div className="row">
                <GameTypeComponent></GameTypeComponent>
            </div>
        </div>
    )
}

export default GameTypePage