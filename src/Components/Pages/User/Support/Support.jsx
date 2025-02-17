import React from 'react'
import { Link } from 'react-router-dom'

const Support = () => {
  return (
    <div>
      <h2>Support Center</h2>
      <div style={{textAlign:'left'}}><Link style={{fontSize:13,color:'black'}} to ={'/ProblemReport'}>Problem Report - แจ้งปัญหา</Link></div>
      <div style={{textAlign:'left'}}><Link style={{fontSize:13,color:'black'}} to ={'/Privacy&Policy'}>Privacy Policy - นโยบายความเป็นส่วนตัว</Link></div>
      <div style={{textAlign:'left'}}><Link style={{fontSize:13,color:'black'}} to ={'/Termsofservice'}>Terms of Service - เงื่อนไขการให้บริการ</Link></div>
    </div>
  )
}

export default Support
