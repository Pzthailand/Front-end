import React, { useState } from 'react';

// CSS
import '../../../Style/Administrator/ManagerProduct/ProductCreate.css';

// Functions
import { _ProductCreate } from '../../../Functions/Products';

export const ProductCreate = () => {
  const [form, setForm] = useState({
    shopname: '',
    brand: '',
    productname: '',
    detail: '',
    price: '',
    group: '',
    type: '',
    productqty: '',
    shippingcost: '',
    file1: null,
    file2: null,
    file3: null,
    file4: null,
    file5: null,
  });

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({
        ...form,
        [name]: files[0], // Update the specific file input
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formWithImageData = new FormData();
    for (const key in form) {
      if (form[key]) { // Avoid appending empty values
        formWithImageData.append(key, form[key]);
      }
    }
    try {
      const res = await _ProductCreate(formWithImageData);
      alert(res.data);
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <div>
      <h2>Products Create</h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
      <div style={{display:'block', width:350,padding:30}}>
        <div className='productCreate-container'>
          <label className='productCreate-label' htmlFor="shopname">Shop Name</label>
          <input
            type="text"
            id="shopname"
            name="shopname"
            placeholder="Shop Name"
            value={form.shopname}
            onChange={onChange}
            className='productCreate-input'
          />
        </div>

        <div className='productCreate-container'>
          <label className='productCreate-label' htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            placeholder="Product Brand"
            value={form.brand}
            onChange={onChange}
            className='productCreate-input'
          />
        </div>

        <div className='productCreate-container'>
          <label className='productCreate-label' htmlFor="productname">Product Name</label>
          <textarea 
            id="productname"
            name="productname"
            placeholder="Product Name"
            value={form.productname}
            onChange={onChange}
            maxLength={250}
            className='productCreate-textarea'
          />
        </div>

        <div className='productCreate-container'>
          <label className='productCreate-label' htmlFor="detail">Detail</label>
          <input
            type="text"
            id="detail"
            name="detail"
            placeholder="Product Detail"
            value={form.detail}
            onChange={onChange}
            className='productCreate-input'
          />
        </div>

        <div className='productCreate-container'>
          <label className='productCreate-label' htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={onChange}
            className='productCreate-input'
          />
        </div>

        <div className='productCreate-container'>
          <label className='productCreate-label' htmlFor="group">Group</label>
          <input
            type="text"
            id="group"
            name="group"
            placeholder="Product Group"
            value={form.group}
            onChange={onChange}
            className='productCreate-input'
          />
        </div>

        <div className='productCreate-container'>
          <label className='productCreate-label' htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            placeholder="Product Type"
            value={form.type}
            onChange={onChange}
            className='productCreate-input'
          />
        </div>

        <div className='productCreate-container'>
          <label className='productCreate-label' htmlFor="productqty">Product Quantity:</label>
          <input
            type="text"
            id="productqty"
            name="productqty"
            placeholder="Product Quantity"
            onChange={onChange}
            className='productCreate-input'
          />
        </div>

        <div className='productCreate-container'>
          <label className='productCreate-label' htmlFor="shippingcost">Shipping Cost:</label>
          <input
            type="text"
            id="shippingcost"
            name="shippingcost"
            placeholder="Shipping Cost"
            onChange={onChange}
            className='productCreate-input'
          />
        </div>

            <div className='productCreate-container'>
              <label className='productCreate-label' htmlFor="file1">Image 1:</label>
              <input
                type="file"
                id="file1"
                name="file1"
                onChange={onChange}
                className='productCreate-input'
              />
            </div>

            <div>
              <label className='productCreate-label' htmlFor="file2">Image 2:</label>
              <input
                type="file"
                id="file2"
                name="file2"
                onChange={onChange}
                className='productCreate-input'
              />
            </div>

            <div>
              <label className='productCreate-label' htmlFor="file3">Image 3:</label>
              <input
                type="file"
                id="file3"
                name="file3"
                onChange={onChange}
                className='productCreate-input'
              />
            </div>

            <div>
              <label className='productCreate-label' htmlFor="file4">Image 4:</label>
              <input
                type="file"
                id="file4"
                name="file4"
                onChange={onChange}
                className='productCreate-input'
              />
            </div>

            <div>
              <label className='productCreate-label' htmlFor="file5">Image 5:</label>
              <input
                type="file"
                id="file5"
                name="file5"
                onChange={onChange}
                className='productCreate-input'
              />
            </div>

      </div>

        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;





//single file
/*import React, { useState } from 'react';

//CSS
import '../../../Style/Administrator/ManagerProduct/ProductCreate.css'


//Functions
import { _ProductCreate } from '../../../Functions/Products'

export const ProductCreate = () => {

  const [form, setForm] = useState({
    shopname:'',
    brand:'',
    productname: '',
    detail: '',
    price: '',
    group:'',
    type:'',
    productqty:'',
    shippingcost:'',
    file: null,
    file1: null,
  });

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setForm({
        ...form,
        [name]: files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formWithImageData = new FormData();
    for (const key in form) {
      if (form[key]) { // Avoid appending empty values
        formWithImageData.append(key, form[key]);
      }
    }
    _ProductCreate(formWithImageData)
    .then(res =>{
      alert(res.data)
    }).catch(err =>{
      alert(err.response.data)
    })
  };

  return (
    <div>
      <h2>Products Create</h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div>
          <div>
            <label htmlFor="shopname">Shop Name:</label>
            <input
              type="text"
              id="shopname"
              name="shopname"
              placeholder="Shop Name"
              value={form.shopname}
              onChange={onChange}
            />
          </div>
        </div>
  
        <div>
          <div>
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              placeholder="Product Brand"
              value={form.brand.toLowerCase()}
              onChange={onChange}
            />
          </div>
        </div>
  
        <div>
           <label htmlFor="productname">Product Name:</label>
              <textarea
               style={{ height: 100, width: '65%'}}
               id="productname"
               name="productname"
               placeholder="Product Name"
               value={form.productname}
               onChange={onChange}
               maxLength={250}
           />
       </div>                 
  
        <div >
          <div>
            <label htmlFor="detail">Detail:</label>
            <input
              type="text"
              id="detail"
              name="detail"
              placeholder="Product Detail"
              value={form.detail}
              onChange={onChange}
            />
          </div>
        </div>
  
        <div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={onChange}
            />
          </div>
        </div>
  
        <div>
          <div>
            <label htmlFor="group">Group:</label>
            <input
              type="text"
              id="group"
              name="group"
              placeholder="Product Group"
              value={form.group.toLowerCase()}
              onChange={onChange}
            />
          </div>
        </div>
  
        <div>
          <div>
            <label htmlFor="type">Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              placeholder="Product Type"
              value={form.type.toLowerCase()}
              onChange={onChange}
            />
          </div>
        </div>
  
        <div>
          <div>
            <label htmlFor="productqty">Product Quantity:</label>
            <input
              type="text"
              id="productqty"
              name="productqty"
              placeholder="Product Quantity"
              onChange={onChange}
            />
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="shippingcost">Shipping Cost:</label>
            <input
              type="text"
              id="shippingcost"
              name="shippingcost"
              placeholder="Shipping Cost"
              onChange={onChange}
            />
          </div>
        </div>
  
        <div>
          <div>
            <label htmlFor="file">Image:</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={onChange}
            />
          </div>
        </div>



        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate*/