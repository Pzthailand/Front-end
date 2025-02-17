import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { _ChangePhone } from '../../../../Functions/Auth';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../../Style/Utility/Modal/Modal'; // Import the Modal component
import '../../../../Style/Auth/Account/Account.css';
import '../../../../Style/Utility/error-message.css'

const ChangePhone = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [id, setId] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
  
    const navigate = useNavigate();

    // Redux selectors
    const selectUser = (state) => state.user;
    const user = useSelector(selectUser);

    const selectAccount = (state) => state.account;
    const account = useSelector(selectAccount);
    
    if (!account.phoneotp) {
        return null;
    }

    useEffect(() => {
        setId(user.id);
    }, [user.id]);

    const onSubmit = (data) => {
        const value = {
            phone: data.phone,
        };
        _ChangePhone(id, value)
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
                <h1>Change Phone Number</h1>
                <div className='account-field'>
                    <label> Phone Number </label>
                </div>

                <div className='account-field'>
                    <input 
                        className='account-input'
                        type="text"
                        name="phone"
                        maxLength={10}
                        autoFocus
                        autoComplete='off' 
                        placeholder="0-9"
                        {...register('phone', { required: 'Phone number is required', pattern: { value: /^[0-9]+$/, message: 'Invalid phone number' } })}
                    />
                </div>
                <div className='account-field'>
                    {errors.phone && <span className='error-message'>{errors.phone.message}</span>}
                </div>
                        
                <button className='account-button' type="submit">Change</button>

                <Modal 
                    isOpen={modalOpen} 
                    onClose={() => setModalOpen(false)} 
                    title={modalTitle} 
                    message={modalMessage} 
                />

            </form>
        </div>
    );
};

export default ChangePhone;





/*import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
//Function
import { _ChangePhone } from '../../../../Functions/Auth';

import { Navigate, useNavigate } from 'react-router-dom';

const ChangePhone = () => {

    const [phone, setPhone] = useState('');
  
    const Navigate = useNavigate();

    //Redux
    const SelectUser = (state) => state.user
    const user = useSelector(SelectUser)

    const selectAccount = (state) => state.account;
    const account = useSelector(selectAccount);
    
    if(!account.phoneotp){
        return null;
    }
    
    const [id , setId] = useState('');
    useEffect(()=>{
        setId(user.id)
    },[id])

    const ChangePhone =()=> {
            const  value = {
                phone
            }
            _ChangePhone(id,value)
            .then(res=>{
                alert(res.data)
                Navigate('/Account')
            }).catch(err=>{
                alert(err.response.data)
                //console.log(err)
            })
    }
  return (
    <div>
        <h1>Change Phone Number</h1>
                <div className='account-container'>
                    <div className='account-field'>
                        <label> Phone Number </label>
                    </div>

                    <div className='account-field'>
                        <input 
                        className='account-input'
                        type="text" 
                        name="phone"
                        autoFocus
                        autoComplete='off' 
                        placeholder="0-9" 
                        onChange={e => setPhone(e.target.value)}/>
                    </div>
                            
                    <button className='account-button' onClick={ChangePhone}>Change</button>
                </div>
    </div>
  )
}

export default ChangePhone*/