import axios from "axios";

let instance = axios.defaults.baseURL = 'http://127.0.0.1:8081/api';
/*let instance = axios.defaults.baseURL = 'https://back-end-50tf.onrender.com/api';*/
axios.defaults.withCredentials=true
axios.defaults.timeout = 10000;


export const _Addtocart = async(value)=> 
    await axios.post(instance+'/Addtocart',value);

export const _UserAddtocartList = async(value)=> 
    await axios.post(instance+'/UserAddtocartList',value);

export const _Updatecart = async(value)=> 
    await axios.put(instance+'/AddtocartUpdate',value);

export const _ProductAddtocartRemove = async(value)=> 
    await axios.post(instance+'/AddtocartRemove',value);












