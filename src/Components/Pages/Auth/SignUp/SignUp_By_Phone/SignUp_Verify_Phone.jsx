import React,{useState} from 'react';
// Function
import { _SignUpPhone } from '../../../../Functions/Auth';
// Redux
import { useDispatch } from 'react-redux';
import { signUpUsers } from '../../../../Reducer/userSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


import Modal from '../../../../Style/Utility/Modal/Modal'; // Import the Modal component

const SignUp_Verify_Phone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const onSubmit = async (data) => {
    const value = {
      phone: data.phone,
    };

    try {
      const res = await _SignUpPhone(value);
      const userData = {
        phone : res.data.user.phone,
        otp: res.data.user.otp,
      };
      dispatch(signUpUsers(userData));
      navigate('/SignUpVerifyOTPPhone');
    } catch (err) {
      setModalMessage(err.response.data)
      setModalOpen(true);
      //alert(err.response.data);
    }
  };

  return (
    <div className='signup-verify-container'>
        <div className='signup-verify-field'>
        <label className='signup-verify-label'>Phone Number</label>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>

        <div className='signup-verify-field'>
            <input className='signup-verify-input'
              type='text'
              autoComplete='off'
              placeholder='099-999-9999'
              maxLength={10}
              {...register('phone', {
                required: 'Phone Number is required',
                pattern: {
                  value: /[0-9]/,
                  message: 'Invalid Phone Number format',
                },
              })}
            />
          </div>

          {errors.phone && <p className="signup-error-message">{errors.phone.message}</p>}

          <div>
            <button type='submit' className='signup-verify-button'>Next</button>
          </div>
        </form>
                  <Modal 
                        isOpen={modalOpen} 
                        onClose={() => setModalOpen(false)} 
                        title={modalTitle} 
                        message={modalMessage} 
                      />
    </div>
  );
};

export default SignUp_Verify_Phone;
