import React, { useState } from 'react';
import '../ModalConfirmation/ConfirmationModal.css'

// Modal component
const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-confirmation-overlay">
            <div className="modal-confirmation">
                <h3>Are you sure you want to remove ?</h3>
                <div className="modal-confirmation-actions">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;