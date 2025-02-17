import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ProtectProblemReportLoading from './ProtectProblemReportLoading';

const ProtectProblemReport = ({children}) => {
    const selectUser = (state) => state.user;
    const  user  = useSelector(selectUser);
    
    return (user.problemstatus === 'Pending')
    ? <ProtectProblemReportLoading/>
    : children
}

export default ProtectProblemReport
