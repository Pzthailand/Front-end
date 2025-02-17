import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { _Profile } from '../../../../Functions/Auth'
import '../../../../Style/Auth/Account/Account.css'


const Verifyphone = () => {
    const selectUser = (state) => state.user;
    const user = useSelector(selectUser);
    const id = user.id;
    const authtoken = user.token;
    const navigate = useNavigate();

    const [currentPhone , setCurrentPhone]=useState('');
    const [phone , setPhone]=useState('');     

    _Profile(id,authtoken)
    .then(res=>{
        setCurrentPhone(res.data.phone)
        console.log(res.data.phone)
    }).catch(err=>{
        alert(err.response.data)
    })

    const RequestOTP =()=>{

        //const formattedPhone = phone.replace(/\D/g, ''); // ลบอักขระที่ไม่ใช่ตัวเลข
        console.log(phone)
       if(phone != currentPhone){  
        alert('Invalid Phone Number')
       }else{
        navigate('/VerifyphoneOTP')
       }
    }

  return (
    <div className="account-container">
            <div className="account-field">
                <label className='account-label'>Phone Number</label>
            </div>
            <div className="account-field">
                <input  
                    className='account-input'
                    name='phone'
                    autoFocus
                    autoComplete='off'
                    maxLength={10}
                    onChange={e=>setPhone(e.target.value)}
                />
                <button className='account-button'
                onClick={RequestOTP}>Next</button>
            </div>
    </div>
  )
}

export default Verifyphone
