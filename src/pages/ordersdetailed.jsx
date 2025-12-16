import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navabar from "../components/navabar";
import { fetchOrderDetail } from "../api/order";

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetail();
  }, []);

  const loadDetail = async () => {
    try {
      const res = await fetchOrderDetail(id);
      setOrder(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading…</p>;
  if (!order) return <p className="text-center text-danger">Order not found.</p>;

  return (
    <div>

      <div className="container py-4">
        <h3 className="mb-3">Order #{order.id}</h3>

        <div className="card mb-4">
          <div className="card-body">
            <p><b>Status:</b> {order.status}</p>
            <p><b>Payment:</b> {order.is_paid ? "Paid" : "Pending"}</p>
            <p><b>Payment Method:</b> {order.payment_method}</p>
            <p><b>Ordered At:</b> {new Date(order.created_at).toLocaleString()}</p>
          </div>
        </div>

        <h5>Items</h5>

        {order.items.map((item) => (
          <div key={item.id} className="card mb-2">
            <div className="card-body d-flex align-items-center">
              <img
                src={item.variant_image}
                alt=""
                style={{ width: 70, height: 70, objectFit: "cover" }}
                className="me-3 rounded"
              />

              <div className="flex-grow-1">
                <h6 className="mb-1">{item.product_name}</h6>
                <p className="mb-0 text-muted">SKU: {item.sku}</p>
              </div>

              <div className="text-end">
                <p className="mb-0">Qty: {item.quantity}</p>
                <b>₹{item.line_total}</b>
              </div>
            </div>
          </div>
        ))}

        <div className="card mt-4">
          <div className="card-body text-end">
            <p>Subtotal: ₹{order.subtotal}</p>
            <p>Shipping: ₹{order.shipping}</p>
            <h5>Total: ₹{order.total}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
