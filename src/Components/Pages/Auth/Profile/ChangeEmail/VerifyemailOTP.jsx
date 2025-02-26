import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmailOTP } from '../../../../Reducer/userVerifyOTP'
//Function
import { _VerifyEmailOTP } from '../../../../Functions/Auth';
//CSS
import '../../../../Style/Utility/Verify-OTP.css'

const VerifyemailOTP = () => {
  
    const [inputotp , setInputOtp] = useState('');
    const [minutes , setMinutes] = useState(4);
    const [seconds , setSeconds] = useState(59);

    //Redux
    const SelectUser = (state) => state.user
    const user = useSelector(SelectUser)
    const dispatch = useDispatch();
    //dom
    const navigate = useNavigate();

    const username  = user.username;
    const email = user.email;

    console.log(user.username)

    useEffect(()=>{
        const value = {
          username,
          email
        }
        _VerifyEmailOTP(value)
        .then(res=>{
          setOtp(res.data.user.otp) //Set OTP
          console.log(otp)
          const userData = {
            emailotp : res.data.user.otp //save email otp
          }
          dispatch(verifyEmailOTP(userData));
        }).catch(err=>{
          console.log(err)
        })
    },[])
   
    useEffect(()=>{
        const interval = setInterval(()=>{
          if(seconds > 0 ){
            setSeconds(seconds - 1)
          }
          if(seconds === 0){
            if(minutes === 0 ){
              clearInterval(interval)
            }else{
              setSeconds(60)
              setMinutes(minutes -1);
            }
          }
        },1000)
        return()=>{
          clearInterval(interval);
        };
    },[seconds])


    //Resend New OTP
    const resendOtp=()=>{
        setMinutes(4)
        setSeconds(59)
        //Send Username & Email Req New OTP
        const value = {
          username,
          email
        }
        _RequestChangeEmailOtp(value)
        .then(res=>{
          setInputOtp(res.data.user.otp) //Set OTP
        }).catch(err=>{
          alert(err.response.data);
        })
    }

    //Check null data
    if (user === null){
      return null;
    }
    const [otp, setOtp] = useState('');  //Set OTP
    /*console.log(otp)*/
    const sendOtp =()=>{
      if(inputotp === null){
        alert('Please Input OTP')
      }
      if(inputotp === otp){
        navigate('/ChangeEmail')
      } else{
        alert('Invalid OTP')
      }
    }
  return (
    <div>
        <div className='verify-otp-container'>
                <h1 >Verify OTP</h1>
                <input
                    type='text'
                    name='inputOtp'
                    placeholder='0-9'
                    maxLength={6}
                    onChange={e => setInputOtp(e.target.value)}
                />
                <div>
                    <label style={{ float: 'left' ,marginLeft:15}}>
                        Time Remaining:{" "}
                        <span style={{ fontWeight: 600 }}>
                            {minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds}
                        </span>
                    </label>
                    <label
                        style={{
                            float: 'right', marginRight:30,
                            color: seconds != 0  ? "gray" : "red",
                            cursor: seconds != 0  ? 'not-allowed' : 'pointer'
                        }}
                        disabled={seconds == 0 ? resendOtp : null }
                    >
                        Resend OTP
                    </label>
                </div>
                <div>
                    <button className='verify-otp-button'
                        disabled={seconds == 0}
                        style={{
                            color: seconds == 0 ? "gray" : "white"
                        }}
                        onClick={sendOtp}
                    >
                        Verify
                    </button>
                </div>
    </div>
</div>
  )
}

export default VerifyemailOTP
