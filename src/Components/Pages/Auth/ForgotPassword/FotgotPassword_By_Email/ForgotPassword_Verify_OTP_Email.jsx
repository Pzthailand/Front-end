import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../../../Reducer/userSlice';
//CSS
import '../../../../Style/Utility/Verify-OTP.css'

const ForgotPassword_Verify_OTP_Email = () => {
    const [inputOtp, setInputOtp] = useState('');
    const [minutes, setMinutes] = useState(4);
    const [seconds, setSeconds] = useState(59);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds > 0) {
                    return prevSeconds - 1;
                } else if (minutes > 0) {
                    setMinutes(prevMinutes => prevMinutes - 1);
                    return 59;
                } else {
                    clearInterval(interval);
                    return 0;
                }   
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [minutes]);

    const resendOtp = () => {
                setMinutes(4);
                setSeconds(59);
                // TODO: Implement OTP resend logic
    };

    const selectUser = (state) => state.user;
    const user = useSelector(selectUser);

    // Check null data
    if (user === null) {
        return null;
    }

    const otp = user.otp;

    const sendOtp = () => {
        if (inputOtp.trim() === '') {
            alert('Please fill in OTP');
            return;
        }
        if (inputOtp === otp) {
            const userData = { 
                id: user.id,
            };
            dispatch(forgotPassword(userData));
            navigate('/ResetPasswordByEmail');
        } else {
            alert('Invalid OTP');
        }
    };

    return (
        <div>
            <div className='verify-otp-container'>
                        <h1 >Verify OTP</h1>
                        <input
                            type='text'
                            name='inputOtp'
                            placeholder='0-9'
                            maxLength={6}
                            onChange={e => setInputOtp(e.target.value)}
                        />
                        <div>
                            <label style={{ float: 'left' ,marginLeft:15}}>
                                Time Remaining:{" "}
                                <span style={{ fontWeight: 600 }}>
                                    {minutes < 10 ? `0${minutes}` : minutes}:
                                    {seconds < 10 ? `0${seconds}` : seconds}
                                </span>
                            </label>
                            <label
                                disabled={seconds == 0 ? onClick={resendOtp} : '' } 
                                style={{
                                    float: 'right', marginRight:30,
                                    color: seconds != 0  ? "gray" : "red",
                                    cursor: seconds != 0  ? 'not-allowed' : 'pointer'
                                }}
                                
                            >
                                Resend OTP
                            </label>
                        </div>
                        <div>
                            <button className='verify-otp-button'
                                disabled={seconds == 0}
                                style={{
                                    color: seconds == 0 ? "gray" : "white"
                                }}
                                onClick={sendOtp}
                            >
                                Verify
                            </button>
                        </div>
            </div>
        </div>
    );
};

export default ForgotPassword_Verify_OTP_Email;