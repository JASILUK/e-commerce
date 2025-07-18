import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Navabar from '../components/navabar';
import { Crtcontext } from '../context/CartContext';

function Orders() {
  const {orders}=useContext(Crtcontext)

 

  return (
    <div>        <Navabar/>

    <div className="container py-4">
      <h2 className="text-center mb-4">🧾 Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Order #{order.id || index + 1}</h5>
              <p className="text-muted">🕒 {new Date(order.orderedAt).toLocaleString()}</p>
              <ul className="list-group list-group-flush">
                {order.products.map((product) => (
                  <li key={product.id} className="list-group-item d-flex justify-content-between">
                    <span>{product.title} (x{product.quantity})</span>
                    <strong>₹{product.price * product.quantity}</strong>
                  </li>
                ))}
              </ul>
              <p className="mt-3 fw-bold text-end">
                Total: ₹{order.products.reduce((sum, i) => sum + i.price * i.quantity, 0)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
}

export default Orders;
