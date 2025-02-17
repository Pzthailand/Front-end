import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { _ChangeEmail } from '../../../../Functions/Auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Modal from '../../../../Style/Utility/Modal/Modal'; // Import the Modal component
import '../../../../Style/Auth/Account/Account.css';
import '../../../../Style/Utility/error-message.css'

const ChangeEmail = () => {
    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm();
    const [id, setId] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    const navigate = useNavigate();
    const selectUser = (state) => state.user;
    const user = useSelector(selectUser);

    const selectAccount = (state) => state.account;
    const account = useSelector(selectAccount);
    
    if(!account.emailotp){
        return null;
    }

    useEffect(() => {
        if (user.id) {
            setId(user.id);
        }
    }, [user.id]);

    const onSubmit = (data) => {
        const { email, emailc } = data;

        if (email !== emailc) {
            setError('emailc', {
                type: 'manual',
                message: 'Email Address do not match.',
            });
            return;
        }

        const value = { email };
        _ChangeEmail(id, value)
            .then(res => {
                setModalTitle('Success');
                setModalMessage(res.data);
                setModalOpen(true);
                // Navigate after a brief delay to allow the modal to show
                setTimeout(() => {
                    navigate('/Account');
                }, 3000);
            })
            .catch(err => {
                const errorMessage = err.response?.data || 'An error occurred. Please try again.';
                setModalTitle('Error');
                setModalMessage(errorMessage);
                setModalOpen(true);
            });
    };

    return (
        <div>
            <form className='account-container' onSubmit={handleSubmit(onSubmit)}>
                <h1>Change Email Address</h1>
                <div className='account-field'>
                    <label>New Email Address</label>
                </div>
                <div className='account-field'>
                    <input 
                        className='account-input'
                        type="email"
                        placeholder="New Email Address"
                        {...register('email', { required: 'Email Address is required' })} 
                    />
                </div>
                <div className='account-field'>
                    {errors.email && <span className='error-message'>{errors.email.message}</span>}
                </div>
                

                <div className='account-field'>
                    <label>Confirm Email Address</label>
                </div>
                <div className='account-field'>
                    <input 
                        className='account-input'
                        type="email"
                        placeholder="Confirm Email Address"
                        {...register('emailc', { required: 'Confirm Email Address is required' })} 
                    />
                </div>
                <div className='account-field'>
                    {errors.emailc && <span className='error-message'>{errors.emailc.message}</span>}
                </div>
                

                <div>
                    <button className='account-button' type='submit'>Change</button>
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

export default ChangeEmail;




/*import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
//Function
import { _ChangeEmail } from '../../../../Functions/Auth';

import { useNavigate } from 'react-router-dom';

import '../../../../Style/Auth/Account/Account.css'

import Alert from '../../../../Style/Utility/Alert/Alert' // Import the Alert component

const ChangeEmail = () => {

    const [email,setEmail] = useState('');
    const [emailc,setEmailc] =useState('');

    const Navigate = useNavigate();

    //Redux
    const SelectUser = (state) => state.user
    const user = useSelector(SelectUser)
    const Dispatch = useDispatch();

    const [alert, setAlert] = useState({ type: '', message: '' }); // State for alert
    
    
    const [id , setId] = useState('');
    useEffect(()=>{
        setId(user.id)
    },[id])

    const ChangeEmail =()=> {
        if(email !== emailc){
            //alert('Email Not Match')
            setAlert({ type: 'error', message: 'Email addresses do not match.' });
        } else {
            const  value = {
                email
            }
            _ChangeEmail(id,value)
            .then(res=>{
                alert(res.data)
                Navigate('/Account')
            }).catch(err=>{
                alert(err.response.data)
                //console.log(err)
            })
        }
    }
  return (
    <div>
        <h1>Change Email Address</h1>
        {alert.message && <Alert type={alert.type} message={alert.message} />} {/* Display alert if message exists }*/
               /* <div className='account-container'>
                    <div className='account-field'>
                        <label> New Email Address </label>
                    </div>
                    <div className='account-field'>
                        <input 
                        className='account-input'
                        type="text" 
                        name="email"
                        autoFocus 
                        placeholder="New Email Address" 
                        onChange={e => setEmail(e.target.value)}/>
                    </div>
                        
                    <div className='account-field'><label> Confirm Email Address </label></div>
                    <div className='account-field'>
                        <input 
                        className='account-input'
                        type="text" 
                        name="emailc" 
                        autoFocus
                        autoComplete='off' 
                        placeholder="Confirm Email" 
                        onChange={e => setEmailc(e.target.value)}/>
                    </div>

                <div><button className='account-button' onClick={ChangeEmail}>Change</button></div>
                </div>
    </div>
  )
}

export default ChangeEmail*/