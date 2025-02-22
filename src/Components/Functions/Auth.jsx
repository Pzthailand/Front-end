import axios from "axios";

let instance = axios.defaults.baseURL = 'http://127.0.0.1:8081/api';
/*let instance = axios.defaults.baseURL = 'https://back-end-50tf.onrender.com/api';*/
axios.defaults.withCredentials=true
axios.defaults.timeout = 10000;

//SignUp email Address step 1
export const _SignUpEmail = async(value)=> 
    await axios.post(instance+'/SignUpByEmail',value);
//SignUp Phone Number step 1
export const _SignUpPhone = async(value)=> 
    await axios.post(instance+'/SignUpByPhone',value);
//SignUp email & phone number step 2
export const _SignUp = async(value)=> 
     await axios.post(instance+'/SignUp',value);


export const _SignIn = async(value)=>
    await axios.post(instance+'/SignIn',value);

export const _CurrentUser = async(authtoken) => {
    return await axios.post(instance+'/CurrentUser',{},{
        headers : {
             authtoken, 
        }
    })
}

export const _CurrentAdmin = async(authtoken) => {
        return await axios.post(instance+'/CurrentAdmin',{},{
        headers : {
             authtoken, 
        }
    })
}

//Forgot Password By Phone Function Step 1
export const _ForgotPassword_By_Phone = async(value)=> 
    await axios.post(instance+'/ForgotPasswordByPhone',value);
//Fogot Password By Phone Function Step 2
export const _ResetPassword_By_Phone = async(id,value)=> 
    await axios.put(instance+'/ResetPasswordByPhone/'+id,value);

//Forgot Password By Email Function Step 1
export const _ForgotPassword_By_Email = async(value)=> 
    await axios.post(instance+'/ForgotPasswordByEmail',value);
//Fogot Password By Email Function Step 2
export const _ResetPassword_By_Email = async(id,value)=> 
    await axios.put(instance+'/ResetPasswordByEmail/'+id,value);

//Change Profile Function Step 1
export const _Profile = async(id,authtoken) =>{
    return await axios.get(instance+'/Profile/'+id,{
        headers : {
            authtoken,
       }
    })
}
//Change Profile Function Step 2
export const _ProfileUpdate = async(id,authtoken,value) => {
    console.log(value); return await axios.post(instance+'/ProfileUpdate/'+id,value,{
        headers : {
            authtoken,
        }
    })
}

//Change Email Function Step 1
export const _VerifyEmailOTP = async(value)=> 
    await axios.post(instance+'/VerifyEmailOTP',value);
//Change Email Function Step 2
export const _ChangeEmail = async(id,value)=> 
    await axios.put(instance+'/ChangeEmail/'+id,value);

//Change Phone Function Step 1
export const _VerifyPhoneOTP = async(value)=> 
    await axios.post(instance+'/VerifyPhoneOTP',value);
//Change Phone Function Step 2
export const _ChangePhone = async(id,value)=> 
    await axios.put(instance+'/ChangePhone/'+id,value);