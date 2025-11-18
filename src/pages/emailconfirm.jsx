// src/pages/ConfirmEmail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './email.module.css'

const ConfirmEmail = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`users/v1/auth/registration/account-confirm-email/${key}/`)
      .then(res => {
        toast.success(res.data.detail || "Email confirmed successfully!");
        setLoading(false);
        setTimeout(() => navigate("/login"), 3000); 
      })
      .catch(err => {
        const errorMsg = err.response?.data?.detail || "Failed to verify email";
        toast.error(errorMsg);
        setLoading(false);
      });
  }, [key, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <ToastContainer />
      {loading ? (
        <div>
          <div className="spinner"></div>
          <p>Verifying your email...</p>
        </div>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
};

export default ConfirmEmail;
