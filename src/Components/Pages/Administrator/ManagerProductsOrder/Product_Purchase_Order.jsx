import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { _Product_Purchase_Order } from '../../../Functions/ProductOrder';
import '../../../Style/Administrator/ManagerProductOrder/Product_Purchase_Order.css'; // Import CSS file for print styling

const Product_Purchase_Order = () => {
    const params = useParams();
    const id = params.id;
    const [orderdate, setOrderdate] = useState('');
    const [shopname , setShopname]=useState('');
    const [productname , setProductname]=useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [addres, setAddres] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [phone, setPhone] = useState('');
    const [payment, setPayment] = useState('');
  
    useEffect(() => {
      _Product_Purchase_Order(id)
        .then((res) => {
          setOrderdate(res.data.createdAt || '');
          setShopname(res.data.shopname || '');
          setProductname(res.data.productname || '');
          setFname(res.data.fname || '');
          setLname(res.data.lname || '');
          setAddres(res.data.addres || '');
          setZipcode(res.data.zipcode || '');
          setPhone(res.data.phone || '');
          setPayment(res.data.payment || '');
        })
        .catch((err) => {
          console.error(err);
        });
    }, [id]);
  
    // Function to handle printing
    const handlePrint = () => {
      window.print();
    };
  
    return (
      <div>
        
        <div className="print-section" style={{ textAlign:'left',fontSize:10}}>
          <h1>PZ XPRESS</h1>
          <div>วันที่สั่ง Order Date : {new Date(orderdate).toLocaleDateString('th-TH', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
          })} </div>
          <div>ผู้ส่ง (FROM) : {shopname}</div>
          <div>Product Order : {productname}</div>
          <div>999 สนามบินสุวรรณภูมิ เฟต 2 ต.หนองปรือ อ.บางพลี จ.สมุทรปราการ</div>
          <div>10540</div>
          <div>ผู้รับ (TO) : {fname} {lname}</div>
          <div>{addres}</div>
          <div>{zipcode}</div>
          <div>Phone Number : {phone}</div>
          <div>วิธีการชำระเงิน Payment Method : {payment}</div>
        </div>
        
        <button onClick={handlePrint} style={{ marginTop: 20 , backgroundColor:'blueviolet' }}>
          Print Order
        </button>
      </div>
    );
  };
  
  export default Product_Purchase_Order



  

/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { _Product_Purchase_Order } from '../../../Functions/ProductOrder';
import jsPDF from 'jspdf';

const Product_Purchase_Order = () => {
  const params = useParams();
  const id = params.id;
  const [orderdate, setOrderdate] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [addres, setAddres] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [payment, setPayment] = useState('');

  useEffect(() => {
    _Product_Purchase_Order(id)
      .then((res) => {
        setOrderdate(res.data.createdAt || '');
        setFname(res.data.fname || '');
        setLname(res.data.lname || '');
        setAddres(res.data.addres || '');
        setZipcode(res.data.zipcode || '');
        setPayment(res.data.payment || '');
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // ตั้งค่าเริ่มต้นฟอนต์เป็นฟอนต์มาตรฐานของ jsPDF (ไม่ต้องใช้ฟอนต์ภาษาไทย)
    doc.setFont('helvetica');  // ฟอนต์มาตรฐานที่สามารถใช้งานได้
    doc.setFontSize(16);
    doc.text('PZ XPRESS', 20, 20);
    
    doc.setFontSize(12);
    doc.text('FROM: PZ SHOP', 20, 40);
    doc.text('999 สนามบินสุวรรณภูมิ เฟต 2 ต.หนองปรือ อ.บางพลี จ.สมุทรปราการ 10540', 20, 50);  // ภาษาไทยจะถูกแสดงเป็นการใช้ฟอนต์มาตรฐาน (อาจไม่สมบูรณ์)

    doc.text('TO:', 20, 70);
    doc.text(`${String(fname)} ${String(lname)}`, 20, 80);
    doc.text(String(addres), 20, 90);
    doc.text(String(zipcode), 20, 100);

    doc.text(`Payment Method: ${String(payment)}`, 20, 120);

    // Save the PDF
    doc.save('Product_Purchase_Order.pdf');
  };

  return (
    <div style={{ textAlign: 'left', backgroundColor: 'white', padding: 20 }}>
      <h1>PZ XPRESS</h1>
      <div>วันที่สั่ง Order Date : {new Date(orderdate).toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      })} </div>
      <div>ผู้ส่ง (FROM) : PZ SHOP</div>
      <div>999 สนามบินสุวรรณภูมิ เฟต 2 ต.หนองปรือ อ.บางพลี จ.สมุทรปราการ</div>
      <div>10540</div>
      <div>ผู้รับ (TO) : {fname} {lname}</div>
      <div>{addres}</div>
      <div>{zipcode}</div>
      <div>วิธีการชำระเงิน Payment Method : {payment}</div>

      <button onClick={generatePDF} style={{ marginTop: '20px' }}>
        Download PDF
      </button>
    </div>
  );
};

export default Product_Purchase_Order;*/

/*import React,{ useState } from 'react'
import { useParams } from 'react-router-dom'
import { _Product_Purchase_Order } from '../../../Functions/ProductOrder';

const Product_Purchase_Order = () => {
    const params = useParams();
    const id = params.id;

    const [fname , setfname]=useState('');
    const [lname , setLname]=useState('');
    const [addres , setaddres]=useState('');
    const [zipcode , setZipcode] =useState('');
    const [payment , setPayment] =useState('');

    
    _Product_Purchase_Order(id)
    .then(res=>{
        setfname(res.data.fname);
        setLname(res.data.lname);
        setaddres(res.data.addres);
        setZipcode(res.data.zipcode);
        setPayment(res.data.payment)
    }).catch(err=>{
        console.log(err)
    })


  return (
    <div style={{textAlign:'left'}}>
      <h1>PZ XPRESS</h1>
      <div>FROM : PZ SHOP</div>
      <div>999 สนามบินสุวรรณภูมิ เฟต 2 ต.หนองปรือ อ.บางพลี จ.สมุทรปราการ 10540</div>
      <div>TO : {fname}{' '}{lname}</div>
      <div>{addres}</div>
      <div>{zipcode}</div>
      <div>Payment Method : {payment}</div>
    </div>
  )
}

export default Product_Purchase_Order*/
