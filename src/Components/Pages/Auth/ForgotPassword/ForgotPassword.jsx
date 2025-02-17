import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../Style/Auth/ForgotPassword/ForgotPassword.css'

const ForgotPassword = () => {
    const navigate = useNavigate();

    const forgotPasswordByPhone = () => {
        navigate("/ForgotPasswordVerifyPhone");
    };

    const forgotPasswordByEmail = () => {
        navigate("/ForgotPasswordVerifyEmail");
    };

    return (
        <div className='fogotpassword-main-container'>
            <div className='fogotpassword-main-title'>
                <h1>Forgot Password</h1>
            </div>
            <button className='fogotpassword-main-button' onClick={forgotPasswordByPhone}>
                Phone Number
            </button>
            <button className='fogotpassword-main-button' onClick={forgotPasswordByEmail}>
                Email Address
            </button>
        </div>
    );
};

export default ForgotPassword;