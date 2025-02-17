import React from 'react'
import { Link } from 'react-router-dom'

const Refill = () => {
  return (
    <div>
        <h2>Refill System</h2>

        <div style={{display:'block',width:1024}}>
        <div style={{textAlign:'left',marginBottom:15,fontSize:15,fontWeight:600}}>Add wallet with</div>
        <div style={{textAlign:'left'}}><Link style={{fontSize:13,color:'black'}} to ={'/PaymentQR'}>Scan QR Code</Link></div>

        </div>

    </div>
  )
}

export default Refill
