import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SellerOrdersAPI } from "../api/sellerapi";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    payment: "",
    method: "",
  });

  const navigate = useNavigate();

  const fetchOrders = async () => {
    const res = await SellerOrdersAPI(filters);
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  return (
<div>
       <h3>Orders</h3>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col">
          <select
            className="form-select"
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="SHIPPED">Shipped</option>
          </select>
        </div>

        <div className="col">
          <select
            className="form-select"
            onChange={(e) =>
              setFilters({ ...filters, payment: e.target.value })
            }
          >
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <div className="col">
          <select
            className="form-select"
            onChange={(e) =>
              setFilters({ ...filters, method: e.target.value })
            }
          >
            <option value="">All Methods</option>
            <option value="COD">COD</option>
            <option value="ONLINE">Online</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>#Order</th>
            <th>Buyer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>#{o.id}</td>
              <td>{o.buyer}</td>
              <td>₹{o.total}</td>
              <td>{o.payment_method}</td>
              <td>{o.status}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() =>
                    navigate(`/seller/orders/${o.id}`)
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div> 
  );
}
