import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//Function
import { _Profile, } from '../../../Functions/Auth';

//CSS
import '../../../Style/Auth/Account/Account.css'

const Account = () => {
    const selectUser = (state) => state.user;
    const user = useSelector(selectUser);
    const id = user.id;
    const authtoken = user.token;
    const navigate = useNavigate();

    const [email , setEmail]=useState('');
    const [phone , setPhone]=useState('');

    /*if (!sessionStorage.getItem('reloaded')) {
        sessionStorage.setItem('reloaded', 'true');
        window.location.reload();
    } else {
        sessionStorage.removeItem('reloaded');
    }*/

    useEffect(()=>{
        _Profile(id,authtoken)
        .then(res=>{
            setEmail(res.data.email)
            setPhone(res.data.phone)
        }).catch(err=>{
            console.log(err)
        })
    },[id, authtoken])
    

    const hideEmail = (email) => {
        const [username, domain] = email.split('@');
        const hiddenUsername = username.slice(0, 2) + '****'; // Keep the first 6 characters visible
        return `${hiddenUsername}@${domain}`;
      };
      
    const hiddenEmail = hideEmail(email);
    
    const hidePhone = (phone) => {
        return `${phone.slice(0, 6)}****`; // Keep the first 8 digits visible
    };

    const hiddenPhone = hidePhone(phone);

    const changeEmail =()=>{
        navigate('/Verifyemail')
    }

    const changePhone =()=>{
        navigate('/Verifyphone')
    }


  return (
        <div className="account-container">
            
            <h1>Account information</h1>
            
            <div className="account-field">
                <label>Email Address</label>
            </div>
            <div className="account-field">
                <input
                    className='account-input'
                    value={hiddenEmail}
                    readOnly={true}
                />
                <button className='account-button'
                onClick={changeEmail}>Change</button>
            </div>

            <div className="account-field">
                <label>Phone Number</label>
            </div>
            <div className="account-field">
                <input
                    className='account-input'
                    value={hiddenPhone}
                    readOnly={true}
                />
                <button className='account-button' 
                onClick={changePhone}>Change</button>
            </div>
        </div>
  )
}

export default Account
