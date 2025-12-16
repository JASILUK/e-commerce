import React, { useState } from "react";

export default function BuyNowModal({ open, maxStock, onClose, onConfirm }) {
  const [qty, setQty] = useState(1);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h4>Select Quantity</h4>

        <select
          className="form-select mt-2"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        >
          {Array.from({ length: Math.min(maxStock, 10) }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <div className="mt-4 d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onConfirm(qty)}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}
