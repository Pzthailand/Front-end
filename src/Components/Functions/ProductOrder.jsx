import axios from "axios";

let instance = axios.defaults.baseURL = 'http://127.0.0.1:8081/api';
axios.defaults.withCredentials=true
axios.defaults.timeout = 10000;

/* Administrator Manager Product Order */
export const _ProductOrderList = async()=> 
    await axios.get(instance+'/ProductOrder',{
})

export const _ProductOrderRemove = async(id)=> 
    await axios.delete(instance+'/ProductOrder/'+id);

//Disable
export const _ProductOrderRead = async(id)=> 
    await axios.get(instance+'/ProductOrder/'+id,{
})

export const _ChangeProductOrderStatus = async(value)=> 
    await axios.put(instance+'/ProductOrder',value);

export const _Product_Purchase_Order = async(id)=> 
    await axios.get(instance+'/ProductPurchaseOrder/'+id);


/* User */
/* User Order Product Paynow*/
export const _ProductOrder = async(value)=> 
    await axios.post(instance+'/ProductOrder',value); //For paynow 
/* User Order Product cart*/
export const _ProductOrders = async(value)=> 
    await axios.post(instance+'/ProductOrders',value); //For cart

//User Check Product Order
export const _ProductOrderLists  = async(value)=> 
    await axios.post(instance+'/ProductOrderLists',value);

//User Cancel Product Order
export const _CancelProductOrder  = async(id , value)=> {
        await axios.post(instance+'/CancelProductOrder/'+id , value);
}
//Pay by wallet Product 1 Order
export const _ProductOrderPaymentByWallet = async(value)=> 
    await axios.post(instance+'/ProductOrderPaymentByWallet',value);
//Pay by wallet Product Orders
export const _ProductOrdersPaymentByWallet = async(value)=> 
    await axios.post(instance+'/ProductOrdersPaymentByWallet',value);



