import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold">DressZone</h5>
            <p className="text-muted">Your one-stop fashion destination for Men, Women & Kids.</p>
          </div>

          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/collection" className="text-light text-decoration-none">Collections</Link></li>
              <li><Link to="/cart" className="text-light text-decoration-none">Cart</Link></li>
              <li><Link to="/orders" className="text-light text-decoration-none">My Orders</Link></li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Contact</h6>
            <p className="mb-1"><i className="bi bi-envelope me-2"></i>support@dresszone.com</p>
            <p><i className="bi bi-telephone me-2"></i>+91 98765 43210</p>
          </div>
        </div>

        <hr className="border-top border-secondary" />
        <div className="text-center py-2 small text-muted">
          &copy; {new Date().getFullYear()} Florza. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
