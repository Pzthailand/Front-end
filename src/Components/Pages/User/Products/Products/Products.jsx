    import React, { useEffect, useState } from 'react';
    import { Link , useNavigate } from 'react-router-dom';

    // CSS
    import '../../../../Style/User/Products/Products/ProductsForm.css'
    import '../../../../Style/User/Products/Products/ProductsMenu.css'
    import '../../../../Style/User/Products/Products/Products.css'
    import '../../../../Style/User/Products/Products/ProductsSearch.css'


    // Function
    import { _ProductsType } from "../../../../Functions/Products"


    function Products() {
      const [data, setData] = useState([]);
      const [visibleCount, setVisibleCount] = useState(10);
      const [selectedType, setSelectedType] = useState('');
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');
      const [searchTerm , setSearchTerm] = useState('');


      const filteredProducts = data
      .map(item => item.productname)
      .filter(product => 
          product && product.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const navigate = useNavigate();

      const handleProductClick = (product) => {
        setSearchTerm(product);
        console.log(product);
        navigate(`/ProductsDetail/${product}`)
    };

      //const products = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];// 
      /*const filteredProducts = products.filter(product =>
          product.toLowerCase().includes(searchTerm.toLowerCase())
      );*/

      //data.filter(item => item.productname.toLowerCase().includes(searchTerm.toLowerCase()))

    
      const fetchProducts = async (type = visibleCount) => {
        setLoading(true);
        setError('');
        const value = { type };
        try {
          const res = await _ProductsType(value);
          setData(res.data);
        } catch (err) {
          setError('Failed to load products. Please try again later.');
          console.error(err);
        } finally {
          setLoading(false);  
        }
      };

      useEffect(() => {
        fetchProducts(selectedType);
      }, [selectedType]);

      const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 5);
      };

      const handleTypeChange = (type) => {
        setSelectedType(type);
        setVisibleCount(5);
      };


      return (
            <div>
                    
                  <div className="product-form-container">
                      
                  <div className='product-form-item1'> 

                          <div className="search-container-product">
                                              <input 
                                                  className="search-input-product"
                                                  id='searchTerm'
                                                  name='searchTerm'
                                                  type='text'
                                                  placeholder='Search Products...'
                                                  autoComplete='off'
                                                  value={searchTerm} // เพิ่มค่า value เพื่อให้ช่องค้นหามีการแสดงผล
                                                  onChange={e => setSearchTerm(e.target.value)}
                                              />
                                              {searchTerm && (
                                                  <ul className="results-product">
                                                      {filteredProducts.map((product, index) => (
                                                          <li key={index} onClick={() => handleProductClick(product)}>
                                                              {product}
                                                          </li>
                                                      ))}
                                                  </ul>
                                              )}
                                  </div>

                    </div>

                  <div className="product-form-item2">
                        <div className="product-menu-container">

                          <p style={{color:'red',fontSize:15,fontWeight:600}}>Product Types</p>

                          <div className="product-drop-side">
                            <p>COMPUTER SET</p>
                              <div className='product-drop-side-content'>
                                <p onClick={() => handleTypeChange('desktop')}>Desktop</p>
                                <p onClick={() => handleTypeChange('labtop')}>Laptop</p>
                              </div>
                          </div>

                          <div className="product-drop-side">
                            <p>COMPUTER HARDWARE</p>
                              <div className='product-drop-side-content'>
                              <p onClick={() => handleTypeChange('case')}>Case</p>
                              <p onClick={() => handleTypeChange('mainboard')}>Mainboard</p>
                              <p onClick={() => handleTypeChange('psu')}>PSU - Power Suply </p>
                              <p onClick={() => handleTypeChange('cpu')}>CPU - Central Processing Unit</p>
                              <p onClick={() => handleTypeChange('vga')}>VGA - Video graphics array </p>
                              <p onClick={() => handleTypeChange('ram')}>RAM - Random Access Memory</p>
                              <p onClick={() => handleTypeChange('monitor')}>Monitor</p>
                              <p onClick={() => handleTypeChange('heatsink')}>Heatsink</p>
                              </div>
                          </div>

                          <div className="product-drop-side">
                            <p>STORAGE</p>
                              <div className='product-drop-side-content'>
                                <p onClick={() => handleTypeChange('m.2')}>M.2 NVMe</p>
                                <p onClick={() => handleTypeChange('ssd')}>SSD Solid State Drive</p>
                                <p onClick={() => handleTypeChange('harddisk')}>HDD Harddisk</p>
                              </div>
                          </div>

                          <div className="product-drop-side">
                            <p>CONTROLLER</p>
                              <div className='product-drop-side-content'>
                                <p onClick={() => handleTypeChange('mouse')}>Mouse</p>
                                <p onClick={() => handleTypeChange('keyboard')}>Keyboard</p>
                                <p onClick={() => handleTypeChange('joy')}>Joystick</p>
                              </div>
                          </div>

                          <div className="product-drop-side">
                            <p>SOUND</p>
                              <div className='product-drop-side-content'>
                              <p onClick={() => handleTypeChange('headset')}>Head Set</p>
                                <p onClick={() => handleTypeChange('headphone')}>Head phone</p>
                                <p onClick={() => handleTypeChange('soundbar')}>Sound Bar</p>
                              </div>
                          </div>

                          <div className="product-drop-side">
                            <p>STREAMER</p>
                              <div className='product-drop-side-content'>
                                <p onClick={() => handleTypeChange('soundcard')}>Sound Card</p>
                                <p onClick={() => handleTypeChange('capturecard')}>Capture Card</p>
                              </div>
                          </div>

                          <div className="product-drop-side">
                            <p>ACCESSORIES</p>
                              <div className='product-drop-side-content'>
                                <p onClick={() => handleTypeChange('webcam')}>Webcam</p>
                                <p onClick={() => handleTypeChange('microphone')}>Microphone</p>
                              </div>
                          </div>

                          <div className="product-drop-side">
                            <p>SOFTWARE</p>
                              <div className='product-drop-side-content'>
                                <p onClick={() => handleTypeChange('windows')}>Microsoft windows</p>
                              </div>
                          </div>
                          
                          <p style={{color:'red',fontSize:15,fontWeight:600}}>Other Categories</p>  

                          <p onClick={() => handleTypeChange('phone')}>Phone</p>
                          <p onClick={() => handleTypeChange('macbook')}>Macbook</p>
                          <p onClick={() => handleTypeChange('ipad')}>Ipad</p>
                          <p onClick={() => handleTypeChange('tablet')}>Tablet</p>
                          <p onClick={() => handleTypeChange('smartwatch')}>Smart watch</p>
                          <p onClick={() => handleTypeChange('externalharddisk')}>External Harddisk</p>
                          <p onClick={() => handleTypeChange('flashdrive')}>Flash drive</p>

                          {/* Add more categories as needed */}
                        </div>
                  </div>
        
                  <div className="product-form-item3">
                
                          {loading && <p>Loading products...</p>}
                          {error && <p className="error">{error}</p>}
                          {data.length === 0 && !loading && <p>No products available.</p>}
                          {data
                              .slice(0, visibleCount)
                              .map((item, index) => (
                                  <div key={index}>
                                      <Link to={`/ProductsDetails/${item._id}`}>
                                          <div className="ProductsList">
                                              <div className="card">
                                                  <img
                                                      src={`https://res.cloudinary.com/dwc9pksvu/image/upload/f_auto,q_auto/v1/${item.file1}`}
                                                      alt={item.name || 'Product image'}
                                                  />
                                                  <p className="productname">{item.productname || 'Unnamed Product'}</p>
                                                  <p className="price">฿{item.price?.toLocaleString() || '0'}</p>
                                              </div>
                                          </div>
                                      </Link>
                                  </div>
                              ))}

                          {/*{loading && <p>Loading products...</p>}
                          {error && <p className="error">{error}</p>}
                          {data.length === 0 && !loading && <p>No products available.</p>}
                          {data
                              .filter(item => item.productname.toLowerCase().includes(searchTerm.toLowerCase()))
                              .slice(0, visibleCount)
                              .map((item, index) => (
                                  <div key={index}>
                                      <Link to={`/ProductsDetail/${item.productname}`}>
                                          <div className="ProductsList">
                                              <div className="card">
                                                  <img
                                                      src={`http://127.0.0.1:8081/api/ProductImages/${item.file1}`}
                                                      alt={item.name || 'Product image'}
                                                  />
                                                  <p className="productname">{item.productname || 'Unnamed Product'}</p>
                                                  <p className="price">฿{item.price?.toLocaleString() || '0'}</p>
                                              </div>
                                          </div>
                                      </Link>
                                  </div>
                              ))}*/}
                    
              </div>

              <div className="product-form-item4"> 
                
                            {data.length > visibleCount && (
                              <button className= "product-loadmore" onClick={loadMore}>LOAD MORE</button>
                            )}    
                      
              </div>
          </div>
        </div>
      );
    }



    export default Products;