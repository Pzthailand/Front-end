import axios from "axios";

let instance = axios.defaults.baseURL = 'http://127.0.0.1:8081/api';
axios.defaults.withCredentials=true
axios.defaults.timeout = 10000;


//User
export const _ProblemReport = async(value)=> 
    await axios.post(instance+'/ProblemReport',value);

//Administator
export const _ProblemList = async(value)=> 
    await axios.get(instance+'/ProblemList',value);

export const _ProblemReSearch = async(id)=> 
    await axios.get(instance+'/ProblemRead/'+id);

export const _ProblemStatus = async(value)=> 
    await axios.post(instance+'/ProblemStatus/',value);

export const _ProblemRemove = async(value)=> 
    await axios.post(instance+'/ProblemRemove/',value);

export const _ProblemReply = async(value)=> 
    await axios.post(instance+'/ProblemReply/',value);

