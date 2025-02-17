import React,{useState,useEffect} from 'react'
import { Link , useNavigate } from 'react-router-dom';
//Function
import { _ProductOrderList, _ProductOrderRemove, _ChangeProductOrderStatus } from '../../../Functions/ProductOrder'
//CSS
import '../../../Style/Administrator/ManagerProductOrder/ManagerProductOrder.css'
import '../../../Style/Administrator/Stylebackdashboard.css'
import '../../../Style/Utility/Pagination.css'
import '../../../Style/Utility/Iconstyle.css'
import '../../../Style/Utility/Search.css'
//icon
import Purchase from '../../../../assets/Administrator/icon/purchase-order.ico'
import Invoice from '../../../../assets/Administrator/icon/invoice.ico'
import Remove from '../../../../assets/Administrator/icon/delete.ico'

const ManagerProductsOrder = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
   
  
    const LoadData = () => {
      _ProductOrderList()
        .then(res => {
          console.log(res.data);
          setData(res.data);
          // Assuming you want to set readProduct with the product IDs from the data
        })
        .catch(err => {
          console.log(err.response ? err.response.data : err);
        });
    };
  
    useEffect(() => {
      LoadData();
    }, []);


    /*start search.....*/
    const [searchTerm , setSearchTerm] = useState('');

    const filteredProducts = data
    .map(item => item._id)
    .filter(orderid => 
       orderid && orderid.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const navigate = useNavigate();

    const handleClick = (orderid) => {
      setSearchTerm(orderid);
      navigate(`/ProductPurchaseOrder/${orderid}`)
    };
    /*stop search.....*/ 


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
  
  

    const Product_Remove=(id)=>{
          _ProductOrderRemove(id)
          .then(res => {
            console.log(res);
            LoadData();
        })
        .catch(err => {
            console.log(err);
        });
    }

    /*const ProductOrderStatus = (e) => {

      console.log(e)
    
      /*const id = '670206d91c732e5ad421927a'
      const productorderstatus = 'pending'

      const value = {
        productorderstatus
      }
      _ProductOrderStatus(id,value)
      .then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
  };*/


  const [selectedValue, setSelectedValue] = useState('');
 
  const ProductOrderStatus = (e,id) => {
    const productorderstatus = e.target.value;
    setSelectedValue(productorderstatus);
    
    // You can send the value to a parent component or another function here
    console.log('Product id:',id)
    console.log('Selected Value:', productorderstatus);

    const value = {
      id,
      productorderstatus
    }
    _ChangeProductOrderStatus(value)
    .then(res=>{
    console.log(res)
    }).catch(err=>{
          console.log(err)
    })
  };
  
  const Product_Purchase_Order =(id)=>{
    navigate(`/ProductPurchaseOrder/${id}`)
  }

    
  return (
    <div>
      <h2>Manager Products Order</h2>

      <div className="search-container">
                <input className='search-input' 
                        placeholder='Search.....'
                        id='searchTerm'
                        name='searchTerm'
                        type='string'
                        autoComplete='off'
                        value={searchTerm} // เพิ่มค่า value เพื่อให้ช่องค้นหามีการแสดงผล
                        onChange={e => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                            <ul className="results">
                                    {filteredProducts.map((orderid, index) => (
                                            <li key={index} onClick={() => handleClick(orderid)}>
                                                    {orderid}
                                            </li>
                                        ))}
                            </ul>
                            )}
                </div>

      <div className="product-order-container">
                <div className="product-order-item">No.</div>
                <div className="product-order-item">Order ID</div>
                <div className="product-order-item">Product Image</div>
                <div className="product-order-item">Shop Name</div>
                <div className="product-order-item">Product Name</div>
                <div className="product-order-item">Product Price</div>
                <div className="product-order-item">Product Order Qty.</div>
                <div className="product-order-item">Payment Medthod</div>
                <div className="product-order-item">Shipping Cost</div>
                <div className="product-order-item">Total BATH.</div>
                <div className="product-order-item">Order Date & Time</div>
                <div className="product-order-item">User Data</div>
                <div className="product-order-item">Product Status</div>
                <div className="product-order-item">Action</div>
      </div>

      {currentProducts
        .map((item, index)=>(
              <div key={index}>
                <div className="product-order-container">
                  <div className="product-order-item" >{index +1}</div>
                  <div className="product-order-item" >{item._id}</div>
                  <div className="product-order-item" >
                    <img className='product-order-img' src={`http://127.0.0.1:8081/api/ProductImages/${item.file1}`} />
                  </div>
                  <div className="product-order-item" ><div style={{textAlign:'left', textWrap:'wrap'}}>{item.shopname}</div></div>
                  <div className="product-order-item" ><div style={{textAlign:'left', textWrap:'wrap'}}>{item.productname}</div></div>
                  <div className="product-order-item" >{(item.price).toLocaleString()}</div>
                  <div className="product-order-item" >{item.orderqty}</div>
                  <div className="product-order-item" >{item.payment}</div>
                  <div className="product-order-item" >{(item.shippingcost*item.orderqty).toLocaleString()}</div>
                  <div className="product-order-item" >{((item.price*item.orderqty) + (item.shippingcost*item.orderqty)).toLocaleString()}</div>
                  <div className="product-order-item" >{new Date(item.createdAt).toLocaleDateString('en-GB', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            hour12: true // Use 12-hour format
                                                          })}
                                                      </div>
                  <div className="product-order-item" >   <div style={{textAlign:'left'}} > Firstname : {item.fname} </div>
                                                          <div style={{textAlign:'left'}} > Lastname : {item.lname} </div>
                                                          <div style={{textAlign:'left'}} > Address : {item.addres} </div>
                                                          <div style={{textAlign:'left'}} > Zip : {item.zipcode} </div> 
                                                          <div style={{textAlign:'left'}} > Phone : {item.phone} </div> 
                                                  </div>
                  <div className="product-order-item" ><select defaultValue={selectedValue} onChange={(e)=>ProductOrderStatus(e,item._id)}>
                                                          <option defaultValue={item.productorderstatus}>{item.productorderstatus}</option>
                                                          <option value="Pending">Pending</option>
                                                          <option value="Shipped">Shipped</option>
                                                          <option value="Delivered">Delivered</option>
                                                          <option value="Finish">Finish</option>
                                                          <option value="Canceled">Canceled</option>
                                                        </select>
                                                      </div>

                  <div className="product-order-item" >

                                                      <div onClick={() => Product_Purchase_Order(item._id)} >
                                                          <img className='icon-style' src={Purchase} />
                                                      </div>    

                                                         
                                                      <div onClick={() => Product_Remove(item._id)} >
                                                          <img className='icon-style' src={Remove} />
                                                      </div>

                                                    </div>

                </div>
              </div>
            ))}

           
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

      <Link className='style-back-dashboard' to="/Adminitratordashboard">Back to Manager Page</Link>
    </div>
  )
}

export default ManagerProductsOrder
