import React,{useEffect,useState} from 'react'
import { useNavigate,Link} from "react-router-dom";
import {  useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

//CSS
import '../../../../Style/User/Products/ProductsPaynow/ProductsPaynow.css'
//Function
import { _ProductRead } from '../../../../Functions/Products';
import { _Profile } from '../../../../Functions/Auth';
import { _ProductOrder, _ProductOrderPaymentByWallet } from '../../../../Functions/ProductOrder';

//Modal
import Modal from '../../../../Style/Utility/Modal/Modal';

const ProductsPaynow = () => {
  //Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

 const params = useParams();
 //Product data
 const productid = params.id

  useEffect(() => {
    const LoadData = () => {
      _ProductRead(productid)
        .then(res => {
            setFile1(res.data.file1)
            setShopName(res.data.shopname)
            setBrand(res.data.brand)
            setProductName(res.data.productname)
            setPrice(res.data.price)
            setProductqty(res.data.productqty)
            setShippingCost(res.data.shippingcost)
        })
        .catch(err => {
          console.log(err);
        });
    };
    LoadData();
  }, [productid]);
  
 
  const [file1 , setFile1] = useState('');
  const [shopname , setShopName] = useState('');
  const [brand, setBrand] = useState(''); 
  const [productname , setProductName] = useState('');
  const [productqty , setProductqty] = useState('');
  const [orderqty , setOrderqty] = useState(1)  
  const [price , setPrice] = useState('');
  const [shippingcost , setShippingCost] = useState('');

  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handlePaymentSelect = (event) => {
        setSelectedPaymentMethod(event.target.value);
        console.log(`Selected payment method: ${event.target.value}`);
  };

  //Redux
  const selectUser = (state) => state.user;
  const  user  = useSelector(selectUser);
  const navigate = useNavigate();

  //User data
  const userid = user.id;
  const [fname , setFname]=useState('');
  const [lname , setLname]=useState('');
  const [addres , setAddres]=useState('');
  const [zipcode , setZipcode]=useState('');
  const [phone , setPhone]=useState('');
  const [wallet , setWallet]=useState(0);

  useEffect(()=>{
    const id = user.id;
    const authtoken = user.token;
   
    _Profile(id,authtoken)
    .then(res =>{
      setFname(res.data.fname);
      setLname(res.data.lname);
      setAddres(res.data.addres);
      setZipcode(res.data.zipcode);
      setPhone(res.data.phone);
      setWallet(res.data.wallet);
    }).catch(err=>{
      alert(err.response.data)
    })
  },[userid])

  
  const ProductOrder=()=>{

    //Check value
    if (!user.username){
      setModalTitle('Error');
      setModalOpen(true);
      setModalMessage('Not ready to order')
      return;
    }

    if(orderqty <= 0){
      setModalTitle('Error');
      setModalOpen(true);
      setModalMessage('Please fill in Order Quantity')
      return;
    }

    //Limit Order quantity
    if(orderqty >= 6){
      setModalTitle('Error');
      setModalOpen(true);
      setModalMessage('Order a maximum of 5 products')
      return;
    }
      
      const payment = selectedPaymentMethod;
      if (selectedPaymentMethod === ''){
        setModalOpen(true);
        setModalTitle('Error');
        setModalMessage('Please select Payment Medthod')
        return;
      }

      if (addres === ''){
        setModalOpen(true);
        setModalTitle('Error');
        setModalMessage('Please fill in address')
        navigate('/Profile')
        return;
      }

      if (zipcode === '' ) {
        setModalOpen(true);
        setModalTitle('Error');
        setModalMessage('Please fill in zipcdode')
        navigate('/Profile');
        return;
      }

      const phonePattern = /^0\d{9}$/;  // Regular Expression สำหรับเบอร์โทรไทย

      if (!phonePattern.test(phone)) {
        setModalOpen(true);
        setModalTitle('Error');
        setModalMessage('Please fill in phone number')
        navigate('/Account');
        return;
      }
      
      if (productqty < orderqty){
        setModalTitle('Error');
        setModalOpen(true);
        setModalMessage('Out of stock');
        return;
      } else {

      if (selectedPaymentMethod === 'Wallet') {
                  const value = {
                    username : user.username,
                    amount : ((price+shippingcost)*orderqty),
                    userid,
                    shopname,
                    productid,
                    productname,
                    brand,
                    price,
                    orderqty,
                    payment,
                    fname,
                    lname,
                    addres,
                    zipcode,
                    phone,
                    shippingcost,
                    file1
                }
                console.log(value)
                  _ProductOrderPaymentByWallet(value)
                  .then(res=>{
                    setModalOpen(true);
                    setModalTitle('Success');
                    setModalMessage(res.data);
                    setTimeout(() => {
                      navigate('/ProductsOrderList')
                    },1500)
                  }).catch(err=>{
                    setModalOpen(true);
                    setModalTitle('Error');
                    setModalMessage(err.response?.data || 'An error occurred');
                  })
          
              } else if (selectedPaymentMethod === 'Cash on delivery') {
                      const value = {
                        userid,
                        shopname,
                        productid,
                        productname,
                        brand,
                        price,
                        orderqty,
                        payment,
                        fname,
                        lname,
                        addres,
                        zipcode,
                        phone,
                        shippingcost,
                        file1
                    }
                    console.log(value)

                    _ProductOrder(value)
                    .then(res=>{
                      setModalOpen(true);
                      setModalTitle('Success');
                      setModalMessage(res.data);
                      setTimeout(() => {
                        navigate('/ProductsOrderList')
                      },1500)
                    }).catch(err=>{
                      setModalOpen(true);
                      setModalTitle('Error');
                      setModalMessage(err.response?.data || 'An error occurred');
                    })
                }
      }
    }
  return (
    <div>

        <div className='productpaynowform'>

        <img className='productpaynowimg' src= {`https://res.cloudinary.com/dwc9pksvu/image/upload/f_auto,q_auto/v1/${file1}`}/>

        
        <p style={{wordWrap:'break-word'}}><b>{productname}</b></p>
        <p><b>Price : </b>฿{(price).toLocaleString()}</p>
        <p><b>Inventories : </b>{(productqty=== 0 ? 'Out of stock' : (productqty))}</p>

        <div className='productpaynow-qty'>

        <label><b>Order Quntity :</b></label>   

                      <input style={{width:35}}
                                    id='orderqty'
                                    type='number' 
                                    name='orderqty'
                                    defaultValue={orderqty} 
                                    onChange={e => setOrderqty(e.target.value)} 
                              />   
          </div>

          <label style={{color:'red'}}>Pay with</label>

          <div className='selectpaynowmethod'>              
                <div>
                        <input 
                            style={{ width: 15, height: 15 , cursor:'pointer'}} 
                            type="radio" 
                            id="wallet" 
                            name="payment-method" 
                            value="Wallet"
                            onChange={handlePaymentSelect} 
                        />
                        <label htmlFor="wallet">Wallet</label>
                        <label htmlFor="wallet">Your Balance {wallet} Bath.</label>
                </div>

                <div className='selectpaynowmethod'>
                        <div>
                                <input 
                                    style={{ width: 15, height: 15 , cursor:'pointer'}} 
                                    type="radio" 
                                    id="cash-delivery" 
                                    name="payment-method" 
                                    value="Cash on delivery"
                                    onChange={handlePaymentSelect} 
                                />
                                <label htmlFor="cash-delivery">Cash on delivery</label>
                        </div>
                </div>

              <div>
                <p><b>Selected Payment Method : </b> {selectedPaymentMethod}</p>
              </div>

              </div>
        
        <p><b>Shipping Cost : </b>฿{(shippingcost).toLocaleString()}</p>

        <p style={{textWrap:'nowrap'}}><b>Total Amount : </b>฿{((price+shippingcost)*orderqty).toLocaleString()}</p>

        <button className='paynow-button' onClick={ProductOrder}>Pay</button> 

        </div>
                          <Modal 
                              isOpen={modalOpen} 
                              onClose={() => setModalOpen(false)} 
                              title={modalTitle} 
                              message={modalMessage} 
                            />
          
    </div>
  )
}

export default ProductsPaynow
