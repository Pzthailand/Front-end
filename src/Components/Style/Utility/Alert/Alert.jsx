import React from 'react';
import  '../Alert/Alert.css' // Make sure to create this CSS file

const Alert = ({ type, message }) => {
    const alertClass = `alert alert-${type}`; // Set the class based on the alert type

    return (
        <div className={alertClass}>
            {message}
        </div>
    );
};

export default Alert;