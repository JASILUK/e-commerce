import React, { useState } from 'react';
import Navabar from '../components/navabar';
import CNavabar from '../components/CNavbar';

function Support() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Thanks for contacting us! We’ll reply shortly.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div>
      

    
    <div className="container py-5" style={{ backgroundColor: "#f9fafb", minHeight: '100vh' }}>
      <div className="text-center mb-5">
        <h2 className="fw-bold">🛠️ Support & Help Center</h2>
        <p className="text-muted">We’re here to help. Contact us for any issues, questions or feedback.</p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="bg-white border rounded shadow-sm p-4 h-100">
            <h5 className="fw-semibold mb-3">📞 Contact Details</h5>
            <p><strong>Email:</strong> support@yourshop.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Hours:</strong> Mon–Sat, 9AM–6PM</p>
          </div>
        </div>

        <div className="col-md-8">
          <div className="bg-white border rounded shadow-sm p-4">
            <h5 className="fw-semibold mb-3">✉️ Send us a Message</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea name="message" rows="4" className="form-control" value={form.message} onChange={handleChange} required />
              </div>

              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <h5 className="fw-semibold mb-3">🔗 Helpful Links</h5>
        <div className="d-flex justify-content-center gap-4 flex-wrap">
          <a href="/faq" className="text-decoration-none text-primary">FAQ</a>
          <a href="/shipping" className="text-decoration-none text-primary">Shipping Info</a>
          <a href="/returns" className="text-decoration-none text-primary">Returns & Refunds</a>
          <a href="/terms" className="text-decoration-none text-primary">Terms & Conditions</a>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Support;
