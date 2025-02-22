import React, { useEffect, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
//Function
import { _ProductList, _ProductRemove } from '../../../Functions/Products';
//CSS
import '../../../Style/Administrator/ManagerProduct/ManagerProduct.css';
import '../../../Style/Administrator/Stylebackdashboard.css'
import '../../../Style/Utility/Pagination.css'
import '../../../Style/Utility/Iconstyle.css'
import '../../../Style/Utility/Search.css'
//ico
import Add from '../../../../assets/Administrator/icon/add.ico'
import Edit from '../../../../assets/Administrator/icon/edit.ico';
import Remove from '../../../../assets/Administrator/icon/delete.ico';

const ManagerProducts = () => {


    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    
    const LoadData = () => {
        _ProductList()
            .then(res => {
                setData(res.data);
                console.log('List', res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        LoadData();
    }, []);


    /* start Remove Product */

    const ProductRemove = (id) => {
        _ProductRemove(id)
            .then(res => {
                console.log(res);
                LoadData();
            })
            .catch(err => {
                console.log(err);
            });
    };

    /* stop Remove Product */

    /*start search.....*/
     const [searchTerm , setSearchTerm] = useState('');

     const filteredProducts = data
     .map(item => item.productname)
     .filter(product => 
        product && product.toLowerCase().includes(searchTerm.toLowerCase())
     );
 
     const navigate = useNavigate();
 
     const handleClick = (product) => {
       setSearchTerm(product);
       navigate(`/ProductUpdateByName/${product}`)
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

   
    return (
        <div>
            
        <h2>Product List</h2>
            
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginBottom:15}}>
            <div>
                <div className="search-container">
                    
                <Link to="/ProductCreate" style={{fontSize:13,color:'black',marginRight:20}}>
                    <img className='product-add-ico' src={Add} alt="Add" /> {/*Add Product*/}
                </Link>

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
                                    {filteredProducts.map((product, index) => (
                                            <li key={index} onClick={() => handleClick(product)}>
                                                    {product}
                                            </li>
                                        ))}
                            </ul>
                            )}
                </div>
            </div>
        </div>

            <div className="product-container">
                <div className="product-item">No</div>
                <div className="product-item">Identification</div>
                <div className="product-item">Product Image</div>
                <div className="product-item">Shop Name</div>
                <div className="product-item">Brand</div>
                <div className="product-item">Product Name</div>
                <div className="product-item">Price</div>
                <div className="product-item">Group</div>
                <div className="product-item">Type</div>
                <div className="product-item">Product Quantity</div>
                <div className="product-item">Action</div>
          
            </div>

            {currentProducts
            .map((item, index) => (
                <div key={index}>
                    <div className="product-container">
                        <div className="product-item">{index + indexOfFirstProduct + 1}</div>
                        <div className="product-item"><div>{item._id}</div></div>
                        <div className="product-item">
                            <img style={{ marginLeft: 0, width: 80, height: 80 }} src={`https://res.cloudinary.com/dwc9pksvu/image/upload/f_auto,q_auto/v1/${item.file1}`} />
                        </div>
                        <div className="product-item">{item.shopname}</div>
                        <div className="product-item">{item.brand}</div>
                        <div className="product-item"><div style={{textAlign:'left',marginLeft:1,marginRight:1}}>{item.productname}</div></div>
                        <div className="product-item">{item.price.toLocaleString()}</div>
                        <div className="product-item">{item.group}</div>
                        <div className="product-item">{item.type}</div>
                        <div className="product-item"><div style={{wordWrap:'break-word'}}>
                                                            {item.productqty.toLocaleString()}
                                                            </div>
                                                        </div>
                        
                        <div className="product-item">

                            <Link to={'/ProductUpdate/' + item._id}>
                                <img className='icon-style' src={Edit} />
                            </Link>
                           
                            <div className='icon-style'
                                        role="button" 
                                        tabIndex={0} 
                                        onClick={() => {
                                            const confirmRemoval = window.confirm("Are you sure you want to remove this item from Manager Product");
                                            if (confirmRemoval) {
                                                try {
                                                    ProductRemove(item._id);
                                                } catch (error) {
                                                    console.error("Error removing product:", error);
                                                    alert("There was an issue removing the item. Please try again.");
                                                }
                                            }
                                        }} 
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault(); // Prevent scrolling when pressing space
                                                const confirmRemoval = window.confirm("Are you sure you want to remove this item from Manager Product ?");
                                                if (confirmRemoval) {
                                                    try {
                                                        ProductRemove(item._id);
                                                    } catch (error) {
                                                        console.error("Error removing product:", error);
                                                        alert("There was an issue removing the item. Please try again.");
                                                    }
                                                }
                                            }
                                        }}  
                                    >
                                        <img className='icon-style' src={Remove} alt="Remove" />
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
    );
};

export default ManagerProducts;