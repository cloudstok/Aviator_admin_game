import React from 'react';
import './model.css'; 

const Modal = ({ show, handleClose, content }) => {
    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                {content}
            </div>
        </div>
    );
};

export default Modal;