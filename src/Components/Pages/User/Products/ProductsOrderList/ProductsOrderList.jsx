import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { _CancelProductOrder, _ProductOrderLists } from '../../../../Functions/ProductOrder'

//CSS
import '../../../../Style/User/Products/ProductsOrderList/ProductsOrderList.css'
import '../../../../Style/Utility/Pagination.css'

//ConfirmationModal
import ConfirmationModal from '../../../../Style/Utility/ModalConfirmation/ConfirmationModal';

const ProductsOrderList = () => {
  //ConfirmationModal
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [modalMessage , setModalMessage] = useState('');

  const selectUser = (state) => state.user;
  const  user  = useSelector(selectUser);
  const userid = user.id;

  const [data, setData] = useState([]);
  const [IsLoading , setIsLoading] = useState('');
  const [error , setError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);

  const loadData = async () => {
    const value = { userid };
    setIsLoading(true); // Start loading
    try {
      const res = await _ProductOrderLists(value);
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      setError('Failed to load data.'); // Set error state
      console.error('Failed to load data:', err);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    loadData();
  }, [userid]); // [userid , data]);

const TrackProduct =(id)=>{
  console.log(id)
}

/* start panigation */
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);
const totalPages = Math.ceil(data.length / productsPerPage);

const handleNextPage = () => {
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
    }
};

const handlePrevPage = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
};
/* stop panigation */

//Cancel Product Order == Pending
const CancelProductOrder= async (id,productid,price,orderqty,shippingcost)=>{
  //console.log('User id : ', userid)  // Later Update
  console.log('Cancel order: ',id ,productid , price,orderqty,shippingcost);
  const value = {
    username : user.username,
    productid,
    price,
    orderqty,
    shippingcost
  }
  const res = await _CancelProductOrder(id,value)
  try {
    setIsModalOpen(null);
    loadData();
  }
  catch(err){
    console.log(err);
  }

  /*_CancelProductOrder(id,value)
  .then(res =>{
    console.log(res)
    loadData();
  }).catch(err=>{
    console.log(err)
  })*/
}

  return (
    <div>
            <h2>Product Order List</h2>
            

          {currentProducts.length != 0 ? '' : 'No Product Order' }
            {currentProducts.map((item,index)=>(
              <div key={index} >

              <div className='product-order-list-container'>

              
              <div className='product-order-list-item2'>

                  <div><img className='img-product-order-list' src={`https://res.cloudinary.com/dwc9pksvu/image/upload/f_auto,q_auto/v1/${item.file1}`}/></div>

              </div>
              

              <div className='product-order-list-item3'>

                    <div style={{display:'inline-block', width:400,marginBottom:15,textAlign:'left',wordWrap:'break-word'}}>
                          <div style={{marginLeft:15,marginRight:15,marginTop:10,marginBottom:15}} >Order id : {item._id}</div>
                          <div style={{marginLeft:15,marginRight:15,}} >{item.productname}</div>
                          <div style={{marginLeft:15,marginRight:15}} >Payment : {item.payment}</div>

                          <Link to={'/ProductsTrack/'+item._id}> 
                                <button 
                                  style={{
                                    float:'right',
                                    fontSize:13,
                                    width:'auto',
                                    fontWeight:600,
                                    backgroundColor:'white',
                                    color: item.productorderstatus === 'Finish' ? 'gray' : 'black',
                                    borderRadius:5,
                                    marginLeft:15
                                  }}
                                    disabled={item.productorderstatus === 'Finish'}
                                    onClick={() => ProductTrack(item._id)}
                                    >
                                      Track Product
                                    </button>
                            </Link>

                            <button
                              style={{
                                float: 'right',
                                fontSize: 13,
                                fontWeight: 600,
                                width: 'auto',
                                backgroundColor: 'white',
                                color: item.productorderstatus === 'Pending' ? 'red' : 'gray',
                                borderRadius: 5,
                                marginLeft: 15,
                              }}
                              disabled={item.productorderstatus !== 'Pending'}
                              onClick={() =>
                                setIsModalOpen({
                                  _id: item._id,
                                  productid: item.productid,
                                  price: item.price,
                                  orderqty: item.orderqty,
                                  shippingcost: item.shippingcost,
                                })
                              }
                            >
                              Cancel
                            </button>

                            {/* Modal Component */}
                            {isModalOpen && isModalOpen._id === item._id && (
                              <ConfirmationModal
                                isOpen={true}
                                onConfirm={() =>
                                  CancelProductOrder(
                                    isModalOpen._id,
                                    isModalOpen.productid,
                                    isModalOpen.price,
                                    isModalOpen.orderqty,
                                    isModalOpen.shippingcost
                                  )
                                }
                                onCancel={() => setIsModalOpen(null)} // ปิด modal
                              />
                            )}
                      </div>  
                             
                </div>


                <div className='product-order-list-item4'>

                    <div style={{display:'inline-block', border:1,width:180,textAlign:'left'}}>
                        <div style={{marginLeft:25,marginRight:15,marginTop:10,float:'right'}} >Status : {item.productorderstatus} </div>
                        <div style={{marginLeft:25,marginRight:15,marginTop:60}} >Quantity : {item.orderqty} </div>
                        <div style={{marginLeft:25,marginRight:15}} >Price : ฿ {(item.price).toLocaleString()} </div>
                        <div style={{marginLeft:25,marginRight:15}} >Shipping : ฿ {(item.shippingcost*item.orderqty).toLocaleString()} </div>
                        <div style={{marginLeft:25,marginRight:15}} >Total : ฿ {((item.price*item.orderqty)+(item.shippingcost*item.orderqty)).toLocaleString()} </div>
                    </div> 

                </div>

                </div>

              </div>
            ))}

          <p>Cannot be canceled if delivery is in progress. ไม่สามารถยกเลิกได้ถ้าหากกำลังจัดส่ง</p>

            <div className="pagination">
                            <button onClick={handlePrevPage} disabled={currentPage === 1}>◄</button>
                            
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button 
                                    key={index + 1} 
                                    onClick={() => setCurrentPage(index + 1)} 
                                    className={currentPage === index + 1 ? 'active' : ''}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button onClick={handleNextPage} disabled={currentPage === totalPages}>►</button>
                </div> 
    </div>
   
  )
}

export default ProductsOrderList  




/*import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { _CancelProductOrder, _ProductOrderLists } from '../../../../Functions/ProductOrder'

//CSS
import '../../../../Style/User/Products/ProductsOrderList/ProductsOrderList.css'
import '../../../../Style/Utility/Pagination.css'


const ProductsOrderList = () => {
  const selectUser = (state) => state.user;
  const  user  = useSelector(selectUser);
  const userid = user.id;

  const [data, setData] = useState([]);
  const [IsLoading , setIsLoading] = useState('');
  const [error , setError] = useState('');

  const loadData = async () => {
    const value = { userid };
    setIsLoading(true); // Start loading
    try {
      const res = await _ProductOrderLists(value);
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      setError('Failed to load data.'); // Set error state
      console.error('Failed to load data:', err);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    loadData();
  }, [userid]); // [userid , data]);

const TrackProduct =(id)=>{
  console.log(id)
}

//Cancel Product Order == Pending
const CancelProductOrder=(id,productid,price,orderqty,shippingcost)=>{
  //console.log('User id : ', userid)  // Later Update
  console.log('Cancel order: ',id ,productid , price,orderqty,shippingcost);

  const value = {
    username : user.username,
    productid,
    price,
    orderqty,
    shippingcost
  }
  _CancelProductOrder(id,value)
  .then(res =>{
    console.log(res)
    loadData();
  }).catch(err=>{
    console.log(err)
  })
}

  return (
    <div>
            <h2>Product Order List</h2>

          {data.length != 0 ? '' : 'No Product Order' }
            {data.map((item,index)=>(
              <div key={index} >

              <div className='product-order-list-container'>

              
              <div className='product-order-list-item2'>

                  <div><img className='img-product-order-list' src={`http://127.0.0.1:8081/api/ProductImages/${item.file1}`}/></div>

              </div>
              

              <div className='product-order-list-item3'>

                    <div style={{display:'inline-block', width:400,marginBottom:15,textAlign:'left',wordWrap:'break-word'}}>
                          <div style={{marginLeft:15,marginRight:15,marginTop:10,marginBottom:15}} >Order id : {item._id}</div>
                          <div style={{marginLeft:15,marginRight:15,}} >{item.productname}</div>
                          <div style={{marginLeft:15,marginRight:15}} >Payment : {item.payment}</div>

                          <Link to={'/ProductsTrack/'+item._id}> 
                                <button 
                                  style={{
                                    float:'right',
                                    fontSize:13,
                                    width:'auto',
                                    fontWeight:600,
                                    backgroundColor:'white',
                                    color: item.productorderstatus === 'Finish' ? 'gray' : 'black',
                                    borderRadius:5,
                                    marginLeft:15
                                  }}
                                    disabled={item.productorderstatus === 'Finish'}
                                    onClick={() => ProductTrack(item._id)}
                                    >
                                      Track Product
                                    </button>
                            </Link>

                          <button
                            style={{
                              float: 'right',
                              fontSize: 13,
                              fontWeight:600,
                              width: 'auto',
                              backgroundColor: 'white',
                              color: item.productorderstatus === 'Pending' ? 'red' : 'gray',
                              
                              borderRadius: 5,
                              marginLeft: 15
                            }}
                            disabled={item.productorderstatus !== 'Pending'}
                            onClick={() => CancelProductOrder(item._id,item.productid,item.price,item.orderqty,item.shippingcost)}
                          >
                            Cancel
                          </button>

                      </div> 
                </div>


                <div className='product-order-list-item4'>

                    <div style={{display:'inline-block', border:1,width:180,textAlign:'left'}}>
                        <div style={{marginLeft:25,marginRight:15,marginTop:10,float:'right'}} >Status : {item.productorderstatus} </div>
                        <div style={{marginLeft:25,marginRight:15,marginTop:60}} >Quantity : {item.orderqty} </div>
                        <div style={{marginLeft:25,marginRight:15}} >Price : ฿ {(item.price).toLocaleString()} </div>
                        <div style={{marginLeft:25,marginRight:15}} >Shipping : ฿ {(item.shippingcost*item.orderqty).toLocaleString()} </div>
                        <div style={{marginLeft:25,marginRight:15}} >Total : ฿ {((item.price*item.orderqty)+(item.shippingcost*item.orderqty)).toLocaleString()} </div>
                    </div> 

                </div>
                
                </div>

              </div>
            ))} 
    </div>
   
  )
}

export default ProductsOrderList*/

