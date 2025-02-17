import React,{useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { _Profile } from '../../../../Functions/Auth'
import '../../../../Style/Auth/Account/Account.css'


const Verifyemail = () => {
    const selectUser = (state) => state.user;
    const user = useSelector(selectUser);
    const id = user.id;
    const authtoken = user.token;
    const navigate = useNavigate();

    const [currentEmail , setCurrentEmail]=useState('');
    const [email , setEmail]=useState('');     

    _Profile(id,authtoken)
    .then(res=>{
        setCurrentEmail(res.data.email)
    }).catch(err=>{
        alert(err.response.data)
    })
   
    //Covert TolowerCase
    const lowerCaseEmail = email.toLowerCase();

    const RequestOTP =()=>{
       if(lowerCaseEmail != currentEmail){
        alert('Invalid Email Address')
       }else{
        navigate('/VerifyemailOTP')
       }
    }

  return (
    <div className="account-container">
            <div className="account-field">
                <label className='account-label'>Email Address</label>
            </div>
            <div className="account-field">
                <input  
                    className='account-input'
                    name='email'
                    autoFocus
                    autoComplete='off'
                    onChange={e=>setEmail(e.target.value)}
                />
                <button className='account-button'
                onClick={RequestOTP}>Next</button>
            </div>
    </div>
  )
}

export default Verifyemail
