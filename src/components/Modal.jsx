import React from 'react'


const Modal = ({ setModalOpen , children }) => {
   
  
    return (
      <div className="modal">
        <section className="modal-main">
          <div>
            {children}
          </div>  
          <br/>
          <button type="button" onClick={() => setModalOpen(false)}>
            Ok
          </button>
        </section>
      </div>
    );
  };

  export default Modal