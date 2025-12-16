import React from 'react';
import { useCart } from '../context/CartContext';
import CartCard from '../components/CartCard';
import { useNavigate } from 'react-router-dom';
import EmptyCartUI from '../components/emptyCatrUI';

function Cart() {

  const { totalItems, totalPrice, clearCart, cart ,loading} = useCart();
  const navigate = useNavigate();

  console.log(cart);

  const trash = () => clearCart();

  return (
    <div>

      
      {cart.length === 0 ? (
      <EmptyCartUI/>
    ) :(<>
    <h1 style={{
        fontSize:"2.5em",
        fontWeight:"700",
        marginTop:'10px',
        marginBottom:'30px',
        background: 'linear-gradient(45deg, #667eea, #764ba2)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textAlign:'center'
      }}>
        🛒 Shopping Cart
      </h1>
      <div className="row w-100">

        {/* LEFT SIDE */}
        <div className="col-md-6"
             style={{height:"100vh",overflowY:"auto",display:"flex",
                     alignItems:"center",flexDirection:"column", padding: "10px"}}>

          
            {cart.length > 0 &&<div className="text-end w-100 px-3 py-2">
            <button onClick={trash} className="btn btn-outline-danger">
              🗑️ Clear Cart
            </button>
          </div>
            }
            

          {cart.length > 0
            && cart.map((item) => <CartCard key={item.variant_id} cartobj={item} />)
            
          }
        </div>

        {/* RIGHT SIDE */}
        {cart.length >0 && <div className="col-md-6 d-flex align-items-center flex-column justify-content-start"
             style={{padding: "20px"}}>
          
          <div className="text-center mb-3">
            <h2 className="mb-1">🛍️ Thank you for shopping with us!</h2>
            <p className="mt-2">
              You are eligible for <strong>Free Shipping</strong> 🚚
            </p>
          </div>

          <div style={{borderBottom:'1px solid gray',width:'40%', marginBottom: '15px'}}></div>

          <div className="text-center bg-light p-3 rounded shadow-sm w-75">
            <p className="fw-bold fs-5 mb-3">Price Details</p>

            <p>Total Items: <strong>{totalItems}</strong></p>
            <p>Total Amount: <strong>₹ {totalPrice}</strong></p>

            {cart.length > 0 ? (
                          <button
              className="btn btn-primary mt-3"
              onClick={() => navigate('/checkout?mode=cart')}
            >
              Proceed to Checkout
            </button>

            ) : (
              <button className="btn btn-primary mt-3"
                      onClick={() => navigate('/collection')}>
                Please add products
              </button>
            )}
          </div>

        </div>}

      </div></>)}
    </div>
  );
}

export default Cart;
