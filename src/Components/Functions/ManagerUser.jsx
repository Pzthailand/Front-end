import axios from "axios";

/*let instance = axios.defaults.baseURL = 'http://127.0.0.1:8081/api';*/
let instance = axios.defaults.baseURL = 'https://back-end-50tf.onrender.com/api';
axios.defaults.withCredentials=true
axios.defaults.timeout = 10000;


export const _ListUsers = async(authtoken) => {
    return await axios.get(instance+'/ListUsers',{
        headers : {
             authtoken,
        }
    })
}

//Read By Id
export const _ReadUsers = async(id , authtoken) => {
    return await axios.get(instance+'/ReadUsers/'+id,{
        headers : {
             authtoken,
        }
    })
}

//Update By Id
export const _UpdateUsers = async(id,authtoken,value) => {
    return await axios.put(instance+'/UpdateUsers/'+id,value,{
        headers : {
            authtoken, 
       }
    })
}

//Read By Name
export const _ReadUsersByName = async(username , authtoken) => {
    return await axios.get(instance+'/ReadUsersByName/'+username,{
        headers : {
             authtoken,
        }
    })
}

//Update By Name
export const _UpdateUsersByName = async(username,authtoken,value) => {
    return await axios.put(instance+'/UpdateUsersByName/'+username,value,{
        headers : {
            authtoken, 
       }
    })
}

export const _ChangeStatus = async(authtoken,value) => {
    return await axios.post(instance+'/ChangeStatus',value,{
        headers : {
             authtoken,
        }
    })
}

export const _ChangeRole = async(authtoken,value) => {
    return await axios.post(instance+'/ChangeRole',value,{
        headers : {
             authtoken,
        }
    })
}

export const _RemoveUsers = async(authtoken,id)=> {
    return await axios.delete(instance+'/RemoveUsers/'+id,{
        headers : {
            authtoken,
       }
    })
}

