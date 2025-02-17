import React,{useEffect,useState} from 'react'
import { Link, useNavigate} from "react-router-dom";

import { useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';


//Function
import { _ProductsName } from '../../../../Functions/Products';
import { _Addtocart } from '../../../../Functions/Addtocart';

//CSS
import '../../../../Style/User/Products/ProductsDetails/ProductsDetailsForm.css'
import '../../../../Style/User/Products/ProductsDetails/ProductsDetails.css'

//Modal
import Modal from '../../../../Style/Utility/Modal/Modal'; // Import the Modal component


const ProductsDetail = () => {

   //Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const SelectUser = (state) => state.user
  const user = useSelector(SelectUser)
  const params = useParams();
  const { name } = useParams();

    
  useEffect(() => {
    const LoadData = () => {
      _ProductsName(name)
        .then(res => {
            setId(res.data._id)
            setGroup(res.data.group)
            setType(res.data.type)
            setShopName(res.data.shopname)
            setBrand(res.data.brand)
            setProductName(res.data.productname)
            setPrice(res.data.price)
            setProductqty(res.data.productqty)
            setShippingcost(res.data.shippingcost)
            setDetail(res.data.detail)

            //image file
            setFile1(res.data.file1)
            setFile2(res.data.file2)
            setFile3(res.data.file3)
            setFile4(res.data.file4)
            setFile5(res.data.file5)
        })
        .catch(err => {
          //console.log(err)
          setModalOpen(true)
          setModalTitle('Error')
          setModalMessage(err.response.data)
        });
    };
    LoadData();
  }, [name]);

  //image file
  const [file1 , setFile1]=useState('');
  const [file2 , setFile2]=useState('');
  const [file3 , setFile3]=useState('');
  const [file4 , setFile4]=useState('');
  const [file5 , setFile5]=useState('');

  const [id , setId] = useState('');
  const [group , setGroup]=useState('');
  const [type , setType]=useState('');
  const [shopname , setShopName]=useState('');
  const [brand, setBrand]=useState(''); 
  const [productname , setProductName]=useState('');
  const [price , setPrice]=useState('');
  const [productqty , setProductqty]=useState('');
  const [shippingcost , setShippingcost] = useState('');
  const [detail , setDetail]=useState('');


  const navigate = useNavigate();  // ใช้ useNavigate จาก React Router
 
   const Addtocart= async (id)=>{
 
     if (!user || !user.id) {
         navigate('/SignIn');  // ถ้าไม่มี user หรือ user.id ให้ไปหน้า login
         return;
     }
     
     try {
         const userid = user.id;
         const productid = id;
         const quantity = 1;
 
         // ข้อมูลของสินค้าที่จะเพิ่ม
         const value = {
             userid,
             shopname,
             productid,
             quantity,
             productname,
             price,
             shippingcost,
             file1,
         };

         if(!value){
            return;
         }
         const res = await _Addtocart(value);
         console.log(res.data);
     } catch (err) {
         //console.error("Error adding to cart:", err.message || err);
         //alert(err.response.data);
        setModalOpen(true)
        setModalTitle('Error')
        setModalMessage(err.response.data)
     }
   }



  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    { id: 1, src: `http://127.0.0.1:8081/api/ProductImages/${file1}`, alt: 'Image 1' },
    { id: 2, src: `http://127.0.0.1:8081/api/ProductImages/${file2}`, alt: 'Image 2' },
    { id: 3, src: `http://127.0.0.1:8081/api/ProductImages/${file3}`, alt: 'Image 3' },
    { id: 4, src: `http://127.0.0.1:8081/api/ProductImages/${file4}`, alt: 'Image 4' },
    { id: 5, src: `http://127.0.0.1:8081/api/ProductImages/${file5}`, alt: 'Image 5' },
  ];

  const handleThumbnailClick = (index) => {
    setSlideIndex(index);
  };

  const handleDotClick = (index) => {
    setSlideIndex(index);
  };


  return (
    <div>
       
      <div className='product-detail-container'>
        <div className='product-detail-item1'>
            
            <div style={{marginLeft:15,marginRight:15}}>
                                      <p><b>Group: </b>{group} {' > '}{type}</p>
                                      <p><b>{productname}</b></p>
                                  </div>
        </div>

        <div className='product-detail-item2'>
          
          <div className="main-slide">
                              
                              <img className="product-detail-img" src={slides[slideIndex].src} alt={slides[slideIndex].alt} />

                                {/*<div className="dots">
                                {slides.map((_, index) => (
                                  <button
                                    key={index}
                                    className={`dot ${index === slideIndex ? 'active' : ''}`}
                                    onClick={() => handleDotClick(index)}
                                  />
                                ))}
                              </div>*/}

                             <div className='thumbnails'>

                                  {slides.map((slide, index) => (
                                    <span style={{marginTop:15,marginLeft:5}} key={index} onClick={() => handleThumbnailClick(index)}>
                                    <img src={slide.src} alt={slide.alt} />
                                  </span>
                                ))}
                              </div> 

                          </div>
        </div>

        <div className='product-detail-item3'>
          
          <div className='buy-container'>

                      <p><b>{productname}</b></p>
                      <p><b>Price : </b>฿{price.toLocaleString()}</p>
                      <p><b>Inventories : </b>{(productqty=== 0 ? 'Out of stock' : (productqty))}</p>
                      <div>

                          <div className='buy-addtocart-container'>

                            <Link to={'/ProductsPaynow/'+id}> 
                              <button className='buy-button'>Buy</button> 
                            </Link>

                            <button className='add-to-cart-button'
                            onClick={() => Addtocart(id)}
                            >Add to cart
                            </button> 
                        </div>

                    </div>
            </div>
        </div>

        <div className='product-detail-item4'>

          <div className='standarddelivery'>
               
           <div style={{textAlign:'left'}}>Standard Delivery</div>
           <div style={{textAlign:'left'}}>Cash on Delivery Available</div>

           </div>
                
        </div>

        <div className='product-detail-item5'>

                                <div className='description'>
                                <p><b>Shop Name : </b>{shopname}</p>
                                <p><b>Brand : </b>{brand.charAt(0).toUpperCase() + brand.slice(1)}</p>
                                <p style={{width:'auto'}}><b>Description : </b>{detail}</p>
                                </div>
        </div>
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

export default ProductsDetail