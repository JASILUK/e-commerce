import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageOrder() {
  const [orders, setOrders] = useState([]);
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      const { data: orderdata } = await axios.get(`${BASE_URL}/orders`);
      if (orderdata) {
        setOrders(orderdata);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    await axios.patch(`${BASE_URL}/orders/${orderId}`, { status: newStatus });
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">🧾 Manage Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders available.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card shadow-lg mb-4 border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">🛍️ Order ID: <span className="text-primary">{order.id}</span></h5>
                <span className="badge bg-dark text-white p-2">
                  {new Date(order.orderedAt).toLocaleString()}
                </span>
              </div>

              <p><strong>👤 User:</strong> {order.userId}</p>
              <p><strong>💳 Payment:</strong> {order.paymentMethod}</p>

              <hr />

              <h6 className="fw-bold text-secondary mb-2">📦 Shipping Address</h6>
              <ul className="list-unstyled">
                <li><strong>Full Name:</strong> {order.address.fullName}</li>
                <li><strong>Phone:</strong> {order.address.phone}</li>
                <li><strong>Address:</strong> {order.address.street}, {order.address.city} - {order.address.PIN}</li>
              </ul>

              <hr />

              <h6 className="fw-bold text-secondary mb-2">🛒 Products</h6>
              <ul className="list-group mb-3">
                {order.products.map((product) => (
                  <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{product.title} <span className="badge bg-secondary">x{product.quantity}</span></span>
                    <strong>₹{product.price * product.quantity}</strong>
                  </li>
                ))}
              </ul>

              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 text-success">Total: ₹{order.products.reduce((sum, p) => sum + p.price * p.quantity, 0)}</h5>

                <div className="d-flex align-items-center gap-2">
                  <label className="fw-bold me-2 mb-0">Status:</label>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ManageOrder;
