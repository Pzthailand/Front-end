import React from 'react';
import './Modal.css'; // Create this CSS file for styles

const Modal = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>{title}</h2>
                <p>{message}</p>
                <button style={{backgroundColor:'blueviolet'}} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;