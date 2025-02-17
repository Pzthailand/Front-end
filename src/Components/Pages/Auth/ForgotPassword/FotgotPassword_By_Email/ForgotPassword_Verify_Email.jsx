import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../../Reducer/userSlice';
// Function
import { _ForgotPassword_By_Email } from '../../../../Functions/Auth';
import { useForm } from 'react-hook-form';
import '../../../../Style/Auth/ForgotPassword/ForgotPassword.css';

const Reset_Password_By_Email = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const requestPassword = async (data) => {
        setLoading(true);

        try {
            const res = await _ForgotPassword_By_Email(data);
            const userData = {
                id: res.data.user.id,
                otp: res.data.user.otp,
            };
            dispatch(forgotPassword(userData));
            navigate('/ForgotPasswordVerifyOTPEmail');  
        } catch (err) {
            alert(err.response.data)
            console.error(err);
            setError(err.response?.data || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgotpassword-container">
            <h1>Forgot Password</h1>
            
            <form onSubmit={handleSubmit(requestPassword)}>
                <div className='fogotpassword-field'>
                    <label className='forgotpassword-label' htmlFor='username'>Username</label>
                </div>

                <div className='fogotpassword-field'>
                    <input className='fogotpassword-input'
                        type="text"
                        {...register('username', { required: 'Username is required' })}
                        placeholder="Username"
                        autoFocus
                    />
                </div>
                    {errors.username && <p className="error-message">{errors.username.message}</p>}
                

                <div className='fogotpassword-field'>
                    <label className='forgotpassword-label' htmlFor='email'>Email Address</label>
                </div>

                <div className='fogotpassword-field'>
                    <input className='fogotpassword-input'
                        type="email"
                        {...register('email', { required: 'Email Address is required', 
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                                                message: 'Invalid Email Address format' } })}
                        placeholder="Email Address"
                    />
                </div>
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                

                <button
                    className="fogotpassword-button"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Request Password'}
                </button>
            </form>
        </div>
    );
};

export default Reset_Password_By_Email;




/* Validate email
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../../Reducer/userSlice';
// Function
import { _ForgotPassword_By_Email } from '../../../../Functions/Auth';
import '../../../../Style/Auth/ForgotPassword/ForgotPassword.css';

const Reset_Password_By_Email = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateInput = () => {
        if (!username || !email) {
            setError("Please fill in all fields.");
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError("Please enter a valid email.");
            return false;
        }
        setError(null);
        return true;
    };

    const requestPassword = () => {
        if (!validateInput()) return;

        setLoading(true);
        const value = { username, email };

        _ForgotPassword_By_Email(value)
            .then(res => {
                const userData = {
                    id: res.data.user.id,
                    otp: res.data.user.otp
                };
                dispatch(forgotPassword(userData));
                navigate('/ForgotPasswordVerifyOTPEmail');  
            })
            .catch(err => {
                console.error(err);
                setError(err.response?.data || "An error occurred. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="forgotpassword-container">
            <h1>Forgot Password</h1>
            
            <div>
                <label className='forgotpassword-label' htmlFor='username'>Username</label>
                <input 
                    type="text"
                    name="username"
                    placeholder="Username"
                    autoFocus
                    onChange={e => setUsername(e.target.value)}
                />
            </div>

            <div>
                <label className='forgotpassword-label' htmlFor='email'>Email</label>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            {error && <p className="signup-error-message">{error}</p>}
            
            <button
                className="forgotpassword-button"
                onClick={requestPassword}
                disabled={loading}
            >
                {loading ? 'Requesting...' : 'Request new password'}
            </button>
        </div>
    );
};

export default Reset_Password_By_Email;*/