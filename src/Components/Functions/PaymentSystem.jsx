import axios from "axios";

let instance = axios.defaults.baseURL = 'http://127.0.0.1:8081/api';
axios.defaults.withCredentials=true
axios.defaults.timeout = 10000;

//Payment By Scan QR Code
export const _PaymentQR = async(id,authtoken,value) => {
    console.log(value); return await axios.post(instance+'/PaymentQR/'+id,value,{
        headers : {
            authtoken,
        }
    })
}