import React, {useContext} from 'react'
import { AppContext } from '../contexts/AppContext';

const Modal = ({ setModalOpen , modalMode, children }) => {
   
  const {revertThrow,finishRound} = useContext(AppContext); 
  
    return (
      <div className="modal">
        <section className="modal-main">
          <div>
            {children}
          </div>  
          <br/>
          {modalMode ==='notice' &&
          <button type="button" onClick={() => setModalOpen(false)}>
            Ok
          </button>
          }
          {modalMode ==='bust_notice' &&
          <div className="modal-buttons">
            <button type="button" onClick={() => {revertThrow();setModalOpen(false);}}>
              Wurf wiederholen
            </button>
            <span>oder</span>
            <button type="button" onClick={() => {finishRound();setModalOpen(false);}}>
              Runde beenden
            </button>
          </div>
          }
        </section>
      </div>
    );
  };

  export default Modal