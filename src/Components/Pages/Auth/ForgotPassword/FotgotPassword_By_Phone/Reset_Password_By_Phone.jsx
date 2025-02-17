import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
//Function
import {  _ResetPassword_By_Phone } from '../../../../Functions/Auth';
import { useNavigate } from 'react-router-dom';
//redux
import { forgotPassword } from '../../../../Reducer/userSlice';

const Reset_Password_By_Phone = () => {

    
    const Navigate = useNavigate();

    const [password,setPassword] = useState('');
    const [passwordc,setPasswordc] =useState('');


    //Redux
    const SelectUser = (state) => state.user
    const user = useSelector(SelectUser)
    const dispatch = useDispatch();
    
    
    const [id , setId] = useState('');
    useEffect(()=>{
        setId(user.id)
    },[id])

    const ResetPassword =()=> {
        if(password !== passwordc){
            alert('Password Not Match')
        } else {
            const  value = {
                password
            }
            _ResetPassword_By_Phone(id,value)
            .then(res=>{
                alert(res.data)
                Navigate('/SignIn')
                dispatch(forgotPassword(null))
            }).catch(err=>{
                alert(err.response.data)
                //console.log(err)
            })
        }
    }
  return (
    <div className='reset-password-container'>
        <h1>Reset Password</h1>

                <div><label className='reset-password-label'> Password</label></div>
                <div><input 
                    type="password" 
                    name="password"
                    autoComplete="off"
                    autoFocus 
                    placeholder="Password" 
                    onChange={e => setPassword(e.target.value)}/>
                </div>
                        
                <div><label className='reset-password-label'> Confirm Password </label></div>
                <div><input
                    type="password" 
                    name="passwordc" 
                    autoComplete="off"
                    autoFocus 
                    placeholder="Confirm Password" 
                    onChange={e => setPasswordc(e.target.value)}/></div>

                <div><button className='reset-password-button' onClick={ResetPassword}>Reset Password</button></div>
    </div>
  )
}

export default Reset_Password_By_Phone
