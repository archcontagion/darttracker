import React from 'react'
import Button from 'react-bootstrap/Button';


const Modal = ({ setModalOpen , show, children }) => {
   
  
    return (
      <div className="modal">
        <section className="modal-main">
          <div>
            {children}
          </div>  
          <br/>
          <Button type="button" onClick={() => setModalOpen(false)}>
            Schliessen
          </Button>
        </section>
      </div>
    );
  };

  export default Modal