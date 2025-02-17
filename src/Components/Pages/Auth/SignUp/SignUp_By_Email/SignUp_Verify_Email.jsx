import React from 'react';
// Function
import { _SignUpEmail } from '../../../../Functions/Auth';
// Redux
import { useDispatch } from 'react-redux';
import { signUpUsers } from '../../../../Reducer/userSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SignUp_Verify_Email = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const value = {
      email: data.email,
    };

    try {
      const res = await _SignUpEmail(value);
      const userData = {
        email: res.data.user.email,
        otp: res.data.user.otp,
      };
      dispatch(signUpUsers(userData));
      navigate('/SignUpVerifyOTPEmail');
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <div className='signup-verify-container'>
        <div className='signup-verify-field'>
          <label className='signup-verify-label'>Email Address</label>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='signup-verify-field'>
            <input className='signup-verify-input'
              type='text'
              autoComplete='off'
              placeholder='example@mail.com'
              {...register('email', {
                required: 'email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format',
                },
              })}
            />
          </div>

          {errors.email && <p className="signup-error-message">{errors.email.message}</p>}

          <div>
            <button type='submit' className='signup-verify-button'>Next</button>
          </div>
        </form>
    </div>
  );
};

export default SignUp_Verify_Email;




/*import React,{useState} from 'react'
//Function
import { _SignUpEmail } from '../../../Functions/Auth';
//Redux
import { useDispatch } from 'react-redux';
import { signUpUsers } from '../../../Reducer/userSlice';

import { useNavigate } from 'react-router-dom';

const SignUpEmail = () => {

  const [email,setEmail] = useState('');
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const CheckEmail=()=>{
    if (email == ''){
      alert('Please input your email')
    }else{
    const value = {
      email
    }
      _SignUpEmail(value)
      .then(res=>{
            const userData = {
              email:(res.data.user.email),
              otp:(res.data.user.otp)
            }
            dispatch(signUpUsers(userData));
            Navigate('/VerifySignUpEmail')
      }).catch(err=>{
        alert(err.response.data)
      })
    }
  }

  return (
    <div >
            <div className='signup-email-container'>
            <label className='signup-email-title'>Email Address</label>
            <input 
                type='text' 
                name='email' 
                placeholder='example@mail.com'
                onChange={e=> setEmail(e.target.value)}
                />
            <div><button className='signup-email-button' onClick={CheckEmail}>Next</button></div>
          </div>
    </div>
  )
}

export default SignUpEmail*/
