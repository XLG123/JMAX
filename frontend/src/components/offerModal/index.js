
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './offer.css';
const ModalContext = React.createContext();
export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])
  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}
export default function OfferModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      {/* <div className='nice'> */}
      <div id="modal-offer" className='sign'>
        {children}

      </div>
      {/* </div> */}
    </div>,
    modalNode
  );
}