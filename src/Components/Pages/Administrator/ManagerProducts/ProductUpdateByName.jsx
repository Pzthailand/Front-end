import React, { useEffect, useState } from 'react';
import { _ProductReadByName , _ProductUpdate } from '../../../Functions/Products';
import { useNavigate, useParams } from 'react-router-dom';


//CSS
import '../../../Style/Administrator/ManagerProduct/ProductUpdate.css'

const ProductUpdateByName = () => {
  const Params = useParams();

  const Navigate = useNavigate();
  const [productid , setProductid] = useState(''); //set for update 

  const [currentimg1, setCurrentImg1] = useState('');
  const [currentimg2, setCurrentImg2] = useState('');
  const [currentimg3, setCurrentImg3] = useState('');
  const [currentimg4, setCurrentImg4] = useState('');
  const [currentimg5, setCurrentImg5] = useState('');

  const [form, setForm] = useState({
    shopname:'',
    brand:'',
    name: '',
    detail: '',
    price: '',
    group:'',
    type:'',
    productqty:'',
    shippingcost:'',
    file1: null,
    file2: null,
    file3: null,
    file4: null,
    file5: null,
  });

  useEffect(() => {
    const LoadData = () => {
      _ProductReadByName(Params.name)
        .then(res => {
          console.log(res.data);
          setForm({
            shopname: res.data.shopname,
            brand: res.data.brand,
            productname: res.data.productname,
            detail: res.data.detail,
            price: res.data.price,
            group: res.data.group,
            type: res.data.type,
            productqty:res.data.productqty,
            shippingcost:res.data.shippingcost,
            file1: null,
            file2: null,
            file3: null,
            file4: null,
            file5: null, // Reset file state
          });
          //Current image file
          setCurrentImg1(res.data.file1);
          setCurrentImg2(res.data.file2);
          setCurrentImg3(res.data.file3);
          setCurrentImg4(res.data.file4);
          setCurrentImg5(res.data.file5);
          setProductid(res.data._id) 
        })
        .catch(err => {
          console.log(err);
        });
    };
    LoadData();
  }, [Params.name]);

  const onChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: files ? files[0] : value, // Handle file input correctly
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formWithImageData = new FormData();
    for (const key in form) {
      if (form[key]) {
        formWithImageData.append(key, form[key]);
      }
    }

    // Include old file URL if needed by backend
    if (currentimg1) {
      formWithImageData.append('currentimg1', currentimg1);
    }
    if (currentimg2) {
      formWithImageData.append('currentimg2', currentimg2);
    }
    if (currentimg3) {
      formWithImageData.append('currentimg3', currentimg3);
    }
    if (currentimg4) {
      formWithImageData.append('currentimg4', currentimg4);
    }
    if (currentimg5) {
      formWithImageData.append('currentimg5', currentimg5);
    }
    try {
      const res = await _ProductUpdate(productid, formWithImageData);
      console.log(res);
      // Optionally reload data
       Navigate('/ManagerProducts')
    } catch (err) {
      alert(err.response?.data || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Product Update</h2>
    <div>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>

    <div style={{display:'block', width:350,padding:30}}>
      <div className='productCreate-container'>
          <label className='productUpdate-label' htmlFor="shopname">Shop Name</label>
          <input
            type="text"
            id="shopname"
            name="shopname"
            placeholder="Shop Name"
            value={form.shopname}
            onChange={onChange}
            className='productUpdate-input'
          />
        </div>

        <div className='productCreate-container'>
          <label className='productUpdate-label' htmlFor="brand">Brand</label>
          <input 
            type="text"
            id="brand"
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={onChange}
            className='productUpdate-input'
          />
        </div>

        <div className='productCreate-container'>
           <label className='productUpdate-label' htmlFor="productname">Product Name</label>
              <textarea
               id="productname"
               name="productname"
               placeholder="Product Name"
               value={form.productname}
               onChange={onChange}
               maxLength={250}
               className='productUpdate-textarea'
           />
       </div>             

        <div className='productCreate-container'>
          <label  className='productUpdate-label' htmlFor="detail">Detail</label>
          <input
            type="text"
            id="detail"
            name="detail"
            placeholder="Product Detail"
            value={form.detail}
            onChange={onChange}
            className='productUpdate-input'
          />
        </div>

        <div className='productCreate-container'>
          <label  className='productUpdate-label' htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={onChange}
            className='productUpdate-input'
          />
        </div>

        <div className='productCreate-container'>
          <label  className='productUpdate-label' htmlFor="group">Group</label>
          <input
            type="text"
            id="group"
            name="group"
            placeholder="Product Group"
            value={form.group}
            onChange={onChange}
            className='productUpdate-input'
          />
        </div>

        <div className='productCreate-container'>
          <label  className='productUpdate-label' htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            placeholder="Product Type"
            value={form.type}
            onChange={onChange}
            className='productUpdate-input'
          />
        </div>

          <div className='productCreate-container'>
            <label className='productUpdate-label' htmlFor="productqty">Product Quantity</label>
            <input
              type="text"
              id="productqty"
              name="productqty"
              placeholder="Product Quantity"
              value={form.productqty}
              onChange={onChange}
              className='productUpdate-input'
            />
          </div>
       
          <div className='productCreate-container'>
            <label  className='productUpdate-label' htmlFor="shippingcost">Shipping Cost</label>
            <input
              type="text"
              id="shippingcost"
              name="shippingcost"
              placeholder="Shipping Cost"
              value={form.shippingcost}
              onChange={onChange}
              className='productUpdate-input'
            />
          </div>

          <div>
                <label>Current Image 1:</label>
                {currentimg1 && <img src={`https://res.cloudinary.com/dwc9pksvu/image/upload/f_auto,q_auto/v1/${currentimg1}`} alt="Old Product" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
              </div>

              <div>
                <label htmlFor="file1">New Image:</label>
                <input
                  type="file"
                  id="file1"
                  name="file1"
                  onChange={onChange}
                />
              </div>


              <div>
                <label>Current Image 2:</label>
                {currentimg2 && <img src={`https://res.cloudinary.com/dwc9pksvu/image/upload/f_auto,q_auto/v1/${currentimg2}`} alt="Old Product" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
              </div>

              <div>
                <label htmlFor="file2">New Image:</label>
                <input
                  type="file"
                  id="file2"
                  name="file2"
                  onChange={onChange}
                />
              </div>

              <div>
                <label>Current Image 3:</label>
                {currentimg3 && <img src={`https://res.cloudinary.com/dwc9pksvu/image/upload/f_auto,q_auto/v1/${currentimg3}`} alt="Old Product" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
              </div>

              <div>
                <label htmlFor="file3">New Image:</label>
                <input
                  type="file"
                  id="file3"
                  name="file3"
                  onChange={onChange}
                />
              </div>


              <div>
                <label>Current Image 4:</label>
                {currentimg4 && <img src={`hhttps://res.cloudinary.com/dwc9pksvu/image/upload/f_auto,q_auto/v1/${currentimg4}`} alt="Old Product" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
              </div>

              <div>
                <label htmlFor="file4">New Image:</label>
                <input
                  type="file"
                  id="file4"
                  name="file4"
                  onChange={onChange}
                />
              </div>

              <div>
                <label>Current Image 5:</label>
                {currentimg5 && <img src={`https://res.cloudinary.com/dwc9pksvu/image/upload/f_auto,q_auto/v1/${currentimg5}`} alt="Old Product" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
              </div>

              <div>
                <label htmlFor="file5">New Image:</label>
                <input
                  type="file"
                  id="file5"
                  name="file5"
                  onChange={onChange}
                />
              </div>
        </div>

        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default ProductUpdateByName;