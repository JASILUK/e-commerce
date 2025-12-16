import React, { useState } from "react";
import { addAddressAPI } from "../api/checkout";

export default function AddressForm({ onSuccess }) {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address_line: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await addAddressAPI(form);
    onSuccess();
  };

  return (
    <div className="mt-3">
      <input className="form-control mb-2" name="full_name" placeholder="Full Name" onChange={handleChange}/>
      <input className="form-control mb-2" name="phone" placeholder="Phone" onChange={handleChange}/>
      <input className="form-control mb-2" name="address_line" placeholder="Street" onChange={handleChange}/>
      <input className="form-control mb-2" name="city" placeholder="City" onChange={handleChange}/>
      <input className="form-control mb-2" name="state" placeholder="State" onChange={handleChange}/>
      <input className="form-control mb-2" name="pincode" placeholder="Pincode" onChange={handleChange}/>

      <button className="btn btn-success w-100" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
}
