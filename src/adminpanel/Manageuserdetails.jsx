import React from 'react';
import { useParams } from 'react-router-dom';
import Usecustom from '../customehook/Usecustom';

function Manageuserdetails() {
  const { id } = useParams();
  const { data: user } = Usecustom(`http://localhost:5000/users/${id}`);
  const { data: cart } = Usecustom(`http://localhost:5000/carts?userId=${id}`);
  const { data: wishlist } = Usecustom(`http://localhost:5000/wishlist?UserId=${id}`);
  const { data: orders } = Usecustom(`http://localhost:5000/orders?userId=${id}`);

  if (!user) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">👤 User Details</h2>

      <div className="card shadow-sm mb-4" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <p className="mb-2">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-2">
            <strong>Role:</strong> <span className="text-capitalize">{user.role}</span>
          </p>
          <p>
            <strong>Status:</strong>{' '}
            <span className={`badge ${user.isblocked ? 'bg-danger' : 'bg-success'}`}>
              {user.isblocked ? 'Blocked' : 'Active'}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-light p-4 rounded shadow-sm" style={{ maxWidth: '600px' }}>
        <h5 className="mb-3">🧾 Related Info</h5>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between">
            <strong>🛒 Cart Items:</strong>
            <span>{cart?.[0]?.items?.length || 0}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <strong>❤️ Wishlist Items:</strong>
            <span>{wishlist?.[0]?.wishitem?.length || 0}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <strong>📦 Total Orders:</strong>
            <span>{orders?.length || 0}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Manageuserdetails;
