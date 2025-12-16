import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SellerOrderDetailAPI } from "../api/sellerapi";

export default function SellerOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    SellerOrderDetailAPI(id).then((res) => setOrder(res.data));
  }, []);

  if (!order) return <p>Loading...</p>;

  return (<div>
      <h3>Order #{order.id}</h3>

      <p><b>Buyer:</b> {order.buyer}</p>
      <p><b>Status:</b> {order.status}</p>
      <p><b>Payment:</b> {order.payment_method}</p>

      <h5>Items</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Variant</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((i, index) => (
            <tr key={index}>
              <td>{i.product_name}</td>
              <td>{i.variant_name}</td>
              <td>{i.quantity}</td>
              <td>₹{i.unit_price}</td>
              <td>₹{i.line_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
}
