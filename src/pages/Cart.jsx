import React, { useContext, useState } from 'react'
import { Crtcontext } from '../context/CartContext'
import CartCard from '../components/CartCard';
import Navabar from '../components/navabar';
import { NavLink, useNavigate } from 'react-router-dom';
import CNavabar from '../components/CNavbar';


function Cart() {
  const { cartdata, clearcart } = useContext(Crtcontext); 
  const totel=cartdata.reduce((last,item)=>last+item.price*item.quantity,0)
  const navigate=useNavigate()

 if(cartdata){
  console.log(cartdata);
 }

 const trash=()=>{
  clearcart()
 }

  return (
    <div>

      <h1 style={{ fontSize:"2.5em",
            fontWeight:"700",
            marginTop:'10px',
            marginBottom:'30px',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign:'center'}}>🛒 Shopping Cart</h1>

      <div className="row w-100">
          <div className="col-md-6" style={{height:"100vh",overflowY:"auto",display:"flex",alignItems:"center",flexDirection:"column", padding: "10px"}}>
            <div className="text-end w-100 px-3 py-2">
              <button onClick={trash} className="btn btn-outline-danger">🗑️ Clear Cart</button>
            </div>
            {(cartdata.length>0)?cartdata.map((item)=><CartCard key={item.id} cartobj={item}/>):<p className="text-muted">Cart is empty</p>}
          </div>

          <div className="col-md-6 d-flex align-items-center flex-column justify-content-start" style={{padding: "20px"}}>
              <div className="text-center mb-3">
                <h2 className="mb-1">🛍️ Thank you for shopping with us!</h2>
                <p className="mt-2">You are eligible for <strong>Free Shipping</strong> 🚚</p>
              </div>
              <div style={{borderBottom:'1px solid gray',width:'40%', marginBottom: '15px'}}></div>
              <div className="text-center bg-light p-3 rounded shadow-sm w-75">
                  <p className="fw-bold fs-5 mb-3">Price Details</p>
                  <p>Total Items: <strong>{cartdata.length}</strong></p>
                  <p>Total Amount: <strong>₹ {totel}</strong></p>
                 
                    {cartdata?.length>0  ? 
                    <button className="btn btn-primary mt-3" 
                    onClick={()=>{navigate('/checkout')}}>Proceed to Checkout</button >:
                     <button className="btn btn-primary mt-3" 
                     onClick={()=>{navigate('/collection')}}>please cart products   </button>}  
                 
              </div>
          </div>
      </div>
    </div>
  )
}

export default Cart
