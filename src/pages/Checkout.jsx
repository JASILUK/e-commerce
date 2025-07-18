import React, { useContext, useEffect, useState } from 'react';
import { Crtcontext } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Usecustom from '../customehook/Usecustom';
import { globelcontext } from '../context/userConetxt';

function Checkout() {
  const { cartdata, clearcart,orders,placeOrder } = useContext(Crtcontext);
  const{user}=useContext(globelcontext)
  const { data: products } = Usecustom('http://localhost:5000/products');
  const navigate = useNavigate();


  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    PIN: '',
    paymentMethod: 'cod'
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!address.fullName || !address.phone || !address.city || !address.street || !address.PIN) {
      alert('Please fill all address fields');
      
      return;
    }

    placeOrder(address)
    navigate('/orders')
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Checkout</h2>

      <div className="row">
        <div className="col-md-6">
          <h4>Shipping Address</h4>
          <input type="text" name="fullName" placeholder="Full Name" className="form-control mb-2" value={address.fullName} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone Number" className="form-control mb-2" value={address.phone} onChange={handleChange} />
          <input type="text" name="street" placeholder="Street Address" className="form-control mb-2" value={address.street} onChange={handleChange} />
          <input type="text" name="city" placeholder="City" className="form-control mb-2" value={address.city} onChange={handleChange} />
          <input type="text" name="PIN" placeholder="PIN Code" className="form-control mb-2" value={address.PIN} onChange={handleChange} />

          <h5 className="mt-3">Payment Method</h5>
          <select className="form-select" name="paymentMethod" value={address.paymentMethod} onChange={handleChange}>
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI (Dummy)</option>
            <option value="card">Card (Dummy)</option>
          </select>

          <button onClick={handleOrder} className="btn btn-success mt-4 w-100">Place Order</button>
        </div>

        <div className="col-md-6">
          <h4>Order Summary</h4>
          <ul className="list-group">
            {cartdata.map((item) => (
              <li className="list-group-item d-flex justify-content-between" key={item.id}>
                <span>{item.title} (x{item.quantity})</span>
                <strong>₹{item.price * item.quantity}</strong>
              </li>
            ))}
          </ul>

          <p className="text-end mt-3 fs-5">
            Total: ₹{cartdata.reduce((sum, i) => sum + i.price * i.quantity, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
