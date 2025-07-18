import React from 'react';
import { useNavigate } from 'react-router-dom';

function Notfound() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h4 className="mb-3">Oops! Page Not Found</h4>
        <p className="text-muted mb-4">
          The page you're looking for doesn't exist or was moved.
        </p>
        <button
          className="btn btn-primary px-4 py-2"
          onClick={() => navigate('/', { replace: true })}
        >
          ⬅ Go to Home
        </button>
      </div>
    </div>
  );
}

export default Notfound;
