import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../../Reducer/userSlice';
// Function
import { _ForgotPassword_By_Phone } from '../../../../Functions/Auth';
import { useForm } from 'react-hook-form';
import '../../../../Style/Auth/ForgotPassword/ForgotPassword.css';

const Reset_Password_By_Phone  = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const requestPassword = async (data) => {
        setLoading(true);

        try {
            const res = await _ForgotPassword_By_Phone(data);
            const userData = {
                id: res.data.user.id,
                otp: res.data.user.otp,
            };
            dispatch(forgotPassword(userData));
            navigate('/ForgotPasswordVerifyOTPPhone');
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
                    <label className='forgotpassword-label' htmlFor='phone'>Phone Number</label>
                </div>

                <div className='fogotpassword-field'>
                    <input className='fogotpassword-input'
                        type="text"
                        {...register('phone', { required: 'Phone Number is required', 
                                    pattern: { value: /[0-9]/, 
                                                message: 'Invalid Phone Number format' } })}
                        placeholder="Phone Number"
                    />
                </div>
                    {errors.phone && <p className="error-message">{errors.phone.message}</p>}
                

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

export default Reset_Password_By_Phone;
