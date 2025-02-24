import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
//Function
import {
  _UserAddtocartList,
  _Updatecart,
  _ProductAddtocartRemove,
} from '../../../../Functions/Addtocart';
//Function
import { _ProductOrders, _ProductOrdersPaymentByWallet } from '../../../../Functions/ProductOrder';
//CSS
import '../../../../Style/User/Products/ProductsCarts/ProductsCartsForm.css';
import '../../../../Style/User/Products/ProductsCarts/ProductsCarts.css';
//icon
import Remove from '../../../../../assets/Products/ProductCart/delete.ico';
import { _Profile } from '../../../../Functions/Auth';

//Modal Style Close 
import Modal from '../../../../Style/Utility/Modal/Modal'; // Import the Modal component
//ConfirmationModal
import ConfirmationModal from '../../../../Style/Utility/ModalConfirmation/ConfirmationModal';

const ProductsCarts = () => {
  //Modal Style Close
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  //ConfirmationModal
  const [isModalOpen, setIsModalOpen] = useState(null);

  const selectUser = (state) => state.user;
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const [userdatacart, setUserdatacart] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  const userid = user.id;
  const authtoken = user.token;
  const value = { userid };

  const loadData = async () => {
    try {
      const res = await _UserAddtocartList(value);
      setUserdatacart(res.data.cart);
    } catch (err) {
      console.log('Error fetching user add to cart list', err.response.data);
    }
  };

  useEffect(() => {
    loadData();
  }, [userid,userdatacart,selectedProducts]); //Follow & update user cart list  & Follw Selected Product id  - get out of stock product

  const UpdateCart = (id, quantity) => {
    const productid = id;
    const values = { userid, productid, quantity };
    _Updatecart(values)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  //Select Product
  const SelectProduct = (shopname , productid, productqty,productname, price, orderqty, shippingcost, file1) => {
    if (productqty === 0) {
      //alert(`Cannot select product ${productname} Out of stock`);
      setModalOpen(true);
      setModalTitle('Error');
      setModalMessage(`Cannot select product ${productname} Out of stock`);
      return;
    }
    if (productqty < orderqty){
      setModalOpen(true);
      setModalTitle('Error');
      setModalMessage('Not enough product');
      return;
    }
    setSelectedProducts((prev) => {
      const newSelected = [...prev];
      const existingProductIndex = newSelected.findIndex(product => product.productid === productid);

        if (existingProductIndex !== -1) {
        // Deselect if already selected
        newSelected.splice(existingProductIndex, 1);
        console.log(`Deselected: ${productid}`);
      } else {
        // Select the product
        const newProduct = { shopname , productid, productname, price, orderqty, shippingcost, file1 };
        newSelected.push(newProduct);
        console.log(`Selected: ${productid}`, newProduct);
      }
      return newSelected; // Return the new array
    });
    // You can handle dependent logic here after updating state
    // Note: This will run before the state is actually updated
    // You might need to trigger a side effect in a useEffect hook instead
  };

  React.useEffect(() => {
    // This will run whenever selectedProducts changes
    console.log('Updated selected products:', selectedProducts);
    // You can place any logic that depends on the updated state here
  }, [selectedProducts]);


  //User data
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
      console.log(err.response.data)
    })
  },[userid])

  //Payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handlePaymentSelect = (event) => {
        setSelectedPaymentMethod(event.target.value);
        console.log(`Selected payment method: ${event.target.value}`);
  };


  const RemoveProductCart = async (id) => {
    const productid = id;
    const value = { userid, productid };
    try {
      await _ProductAddtocartRemove(value);
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  
  const ProductOrders = async () => {
          if(selectedProducts.length === 0){
            setModalOpen(true);
            setModalTitle('Error');
            setModalMessage('Please select product')
            return;
          }
          if (selectedPaymentMethod === ''){
            setModalOpen(true);
            setModalTitle('Error');
            setModalMessage('Please select Payment Medthod')
            return;
          }     

          if (selectedPaymentMethod === 'Wallet') {
                            const value = {
                              username : user.username,
                              amount : total,
                            }
                            const orderDetails = Object.values(selectedProducts).map(product => ({
                            userid: user.id, // Include the user ID
                            fname : fname,
                            lname : lname,
                            addres: addres,
                            zipcode : zipcode,
                            phone : phone,
                            payment : selectedPaymentMethod,
                            shopname : product.shopname,
                            productid: product.productid,
                            productname: product.productname,
                            price: product.price,
                            orderqty: product.orderqty,
                            shippingcost: product.shippingcost,
                            file1: product.file1,
                          }));

                          const data = {
                            value,          // รวม value กับ orderDetails
                            orderDetails,   // ส่ง orderDetails
                        };

                        try {
                              const res = await _ProductOrdersPaymentByWallet(data);
                              setModalOpen(true);
                              setModalTitle('Success');
                              setModalMessage(res.data);
                              setTimeout(() => {
                                // Uncomment to navigate after successful order
                                navigate('/ProductsOrderList');
                            }, 1500);
                      } catch (err) {
                        setModalOpen(true);
                        setModalTitle('Error');
                        setModalMessage(err.response?.data || 'An error occurred');
                      }
                  } else if (selectedPaymentMethod === 'Cash on delivery') {

                    // Prepare the payload with user ID and selected products
                    const orderDetails = Object.values(selectedProducts).map(product => ({
                    userid: user.id, // Include the user ID
                    fname : fname,
                    lname : lname,
                    addres: addres,
                    zipcode : zipcode,
                    phone : phone,
                    payment : selectedPaymentMethod,
                    shopname : product.shopname,
                    productid: product.productid,
                    productname: product.productname,
                    price: product.price,
                    orderqty: product.orderqty,
                    shippingcost: product.shippingcost,
                    file1: product.file1,
                  }));
                try {
                  const res = await _ProductOrders(orderDetails);
                        setModalOpen(true);
                        setModalTitle('Success');
                        setModalMessage(res.data);
                        setTimeout(() => {
                          // Uncomment to navigate after successful order
                          navigate('/ProductsOrderList');
                      }, 1500);
                } catch (err) {
                        setModalOpen(true);
                        setModalTitle('Error');
                        setModalMessage(err.response?.data || 'An error occurred');
                }
              }                 
  };

  

  const UpdateOrderQuantity = (id, value) => {
    // First, check if the product is selected
    const isProductSelected = selectedProducts.some(product => product.productid === id);
    if (isProductSelected) {
      // Prevent updating the quantity if the product has been selected
      setModalOpen(true);
      setModalTitle('Error');
      setModalMessage('You cannot update the quantity after selecting the product.');
      return;
    }
  
    const orderqty = parseInt(value, 10) || 0; // Ensure quantity is a number
    UpdateCart(id, orderqty); // Update the cart with the new quantity
  
    // Update selected products to reflect the new quantity
    setSelectedProducts((prev) => {
      const updatedSelected = prev.map(product =>
        product.productid === id ? { ...product, orderqty } : product
      );
      return updatedSelected;
    });
  };

  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate total whenever selectedProducts changes
    const newTotal = selectedProducts.reduce(
      (acc, { price, orderqty, shippingcost }) => acc + ((price * orderqty) + (shippingcost * orderqty)),
      0
    );
    setTotal(newTotal);
  }, [selectedProducts]);


  // Function to handle item removal
  const handleRemoveProduct = async (id) => {
    const productid = id;
    const value = { userid, productid };
    console.log(id)
    try {
      const res = await _ProductAddtocartRemove(value);
      setIsModalOpen(null);
      loadData();
    } catch (err) {
      console.log(err);
    }
};


  return (
    <div>
      <h2>Product Cart</h2>
      {userdatacart.map((item, index) => (
        <div key={index}>
          <div className='product-cart-container'>

            <div className='product-cart-item2'>
                    <div className='selectproduct'>
                      <input 
                        className='selectproduct'
                        type='checkbox'
                        checked={item.productqty == 0  ? false : null || item.productqty < item.quantity ? false : null} //fase check product out of stock  
                        onChange={(e) =>
                          SelectProduct(item.shopname,item.productid, item.productqty,item.productname ,item.price, item.quantity, item.shippingcost , item.file1)
                        }
                      />
                      {item.productqty ==0 ? //Check out of stock 0 true
                          <img
                            className='product-cart-img-out-of-stock'
                            src={`https://res.cloudinary.com/dwc9pksvu/image/upload/f_auto,q_auto/v1/${item.file1}`}
                            alt={item.productname}
                          />
                      : //Check out of stock 0 false
                          <img
                            className='product-cart-img'
                            src={`https://res.cloudinary.com/dwc9pksvu/image/upload/f_auto,q_auto/v1/${item.file1}`}
                            alt={item.productname}
                          /> 
                      }
                    </div>
            </div>

            <div className='product-cart-item3'>
                    <div className='product-cart-list'>
                      <Link to={`/ProductsDetails/${item.productid}`}>
                        <div className='product-cart-name'>Product ID : {item.productid}</div>
                        <div className='product-cart-name'>{item.productname}</div>
                        <div className='product-cart-name'>Inventories : {item.productqty ==0 ? 'Out of stock' : item.productqty}</div>
                        <div className='product-cart-price'>฿ {(item.price).toLocaleString()}</div>
                        <div className='product-cart-name'>Shipping Cost : {(item.shippingcost * item.quantity).toLocaleString()}</div>
                      </Link>

                      <div style={{ display: 'block' }}>
                        <label className='product-cart-name'>Order Quantity : </label>
                        <input
                          className='product-cart-qty-value'
                          type='number'
                          defaultValue={item.quantity}
                          onChange={(e) => UpdateOrderQuantity(item.productid, e.target.value)} // Updated here
                          autoFocus={false}
                          disabled={selectedProducts.some(product => product.productid === item.productid)}
                        />
                      </div>
                    </div>
            </div>

                    <div className='product-cart-item4'>

                    <div
                        className="product-cart-delete"
                        role="button"
                        tabIndex={0}
                        onClick={() => setIsModalOpen(item.productid)} // เปิด modal เฉพาะสินค้าตัวนี้
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setIsModalOpen(item.productid); // เปิด modal เมื่อกด Enter หรือ Space
                            }
                        }}
                    >
                        <img style={{ width: 25, height: 25 }} src={Remove} alt="Remove" />
                    </div>

                          {/* Modal Component */}
                          {isModalOpen === item.productid && (
                              <ConfirmationModal
                                  isOpen={true}
                                  onConfirm={() => handleRemoveProduct(item.productid)} // ลบสินค้า
                                  onCancel={() => setIsModalOpen(null)} // ปิด modal
                              />
                          )}
                             
                    </div>
          </div>
        </div>
      ))}


      <div className='productcart-paymentmethod'>
      <div><label style={{color:'red',width:100}}>Pay with</label></div>

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

      </div>

      <div className='total'>
        <div>Total Amount : ฿ {total.toLocaleString()}</div>
      </div>

      <button className='productcartorder' onClick={ProductOrders}>Order</button>

                        <Modal 
                                isOpen={modalOpen} 
                                onClose={() => setModalOpen(false)} 
                                title={modalTitle} 
                                message={modalMessage} 
                            />

    </div>
  );
};

export default ProductsCarts;