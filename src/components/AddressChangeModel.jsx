import React, { useEffect, useState } from "react";
import AddressForm from "./Addressform";
import { getAddressListAPI ,setDefaultAddressAPI} from "../api/checkout";

export default function AddressModal({ show, onClose, onUpdated }) {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const loadAddresses = async () => {
    const res = await getAddressListAPI();
    setAddresses(res.data);
  };

  useEffect(() => {
    if (show) loadAddresses();
  }, [show]);

  const handleSelect = async (id) => {
    await setDefaultAddressAPI(id);
    onUpdated(); // Checkout should refresh
    onClose();
  };

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`}>
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h4>Select Address</h4>

          {addresses.map((a) => (
            <div className="p-2 border rounded mb-2" key={a.id}>
              <p>
                <strong>{a.full_name}</strong> <br />
                {a.address_line}, {a.city}
              </p>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleSelect(a.id)}
              >
                Use this address
              </button>
            </div>
          ))}

          {!showForm && (
            <button
              className="btn btn-outline-success w-100 mt-3"
              onClick={() => setShowForm(true)}
            >
              + Add New Address
            </button>
          )}

          {showForm && (
            <AddressForm
              onSuccess={() => {
                setShowForm(false);
                loadAddresses();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
