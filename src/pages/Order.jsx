import React, { useEffect, useState } from "react";

import Navabar from "../components/navabar";
import { useNavigate } from "react-router-dom";
import { fetchMyOrders } from "../api/order";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await fetchMyOrders();
      setOrders(res.data);
      console.log(res.data)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
     

      <div className="container py-4">
        <h2 className="mb-4">My Orders</h2>

        {loading && <p>Loading...</p>}

        {!loading && orders.length === 0 && (
          <p className="text-muted">You have no orders.</p>
        )}

        {orders.map((order) => (
          <div key={order.id} className="card mb-3 shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5>Order #{order.id}</h5>
                <p className="mb-1">Status: <b>{order.status}</b></p>
                <p className="mb-0 text-muted">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>

              <div className="text-end">
                <h5>₹{order.total}</h5>
                <button
                  className="btn btn-outline-primary btn-sm mt-2"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
