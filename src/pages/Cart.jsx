import React, { useContext } from 'react'
import { Crtcontext } from '../context/CartContext'
import CartCard from '../components/CartCard';
import Navabar from '../components/navabar';
import Collection from './Collection';

function Cart() {
  const {cartdata,clearcart}=useContext(Crtcontext)
  const totel=cartdata.reduce((acc,))
 if(cartdata){
  console.log(cartdata);
  
 }

 const trash=()=>{
  clearcart()
 }
 
  
  return (
    <div>
      <Navabar/>
      <h1 style={{ fontSize:" 2.5em",
            fontWeight:" 700",
            marginBottom: '10px',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            webkitBackgroundClip: 'text',
            webkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign:'center'}}>🛒 Shopping Cart</h1>
      <div style={{display:"flex",justifyContent:"space-around",width:"100%"}}>
          <div  style={{height:"100vh",overflow:"scroll",width:"50%",display:"flex",alignItems:"center",
            flexDirection:"column"
            
          }}>
            <div>
              <button onClick={trash}>🗑️</button>
            </div>

            {(cartdata.length>0)?cartdata.map((item)=><CartCard key={item.id} cartobj={item}/>):<p>somthing gone</p>}
          </div>
          <div style={{width:"50%",display:'flex',alignItems:'center',flexDirection:'column'}}>
              <div style={{textAlign:'center'}}>
              <h2 style={{marginBottom:'0'}}>🛍️ Thank you for shopping with us!</h2>
                <p style={{marginTop:'8px'}}>You are eligible for <strong>Free Shipping</strong> 🚚</p>
              </div>
              <div style={{borderBottom:'1px solid gray',width:'40%'}}></div>
              <div>
                  <p>Price Details</p>
                  <p>Total Items: {cartdata.length}</p>
                  <p>Total Amount: ₹</p>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Cart