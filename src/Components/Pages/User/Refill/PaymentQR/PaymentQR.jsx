import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { _PaymentQR } from '../../../../Functions/PaymentSystem';

const PaymentQR = () => {

  //Redux
  const selectUser = (state) => state.user;
  const user = useSelector(selectUser);

  const id = user.id;
  const username = user.username;
  const authtoken = user.token;
  const [amount , setAmount]=useState(0);

  const  PaymentQR = async()=> {
    const value = {
      username,
      amount
    }
    try{ 
      const res = await _PaymentQR(id,authtoken,value)
      alert(res.data);
    }catch(err) {
      alert(err.response.data);
    } 
  }

  return (
    <div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label style={{textAlign:'left'}} htmlFor="amount">Amount</label>
    <input style={{height:30 , width:300}}
        type='text'
        placeholder='Currency THB.' 
        onChange={e=>setAmount(e.target.value)}
        />
    </div>

    <button style={{ height:35 ,width: 150,backgroundColor:'blueviolet',color: 'white', float:'right'}} onClick={PaymentQR}>OK</button>
</div>
  )
}

export default PaymentQR
