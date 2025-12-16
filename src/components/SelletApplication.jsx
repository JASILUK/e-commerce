import React, { useEffect, useState, useContext } from "react";
import {
  getMySellerApplication,
  createSellerApplication,
  updateSellerApplication,
  deleteSellerApplication,
} from "../api/auth";

import { globelcontext } from "../context/userConetxt";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./sellerapplication.css";

export default function SellerApplication() {
  const { user } = useContext(globelcontext);
  const [app, setApp] = useState(null);
  const [loadingApp, setLoadingApp] = useState(true);

  const [form, setForm] = useState({
    store_name: "",
    store_logo: null,
    description: "",
    business_address: "",
  });

  const navigate = useNavigate();

  // Fetch Application on load
  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication = async () => {
  setLoadingApp(true);
  try {
    const res = await getMySellerApplication();

    if (res?.data?.id) {
      setApp(res.data);
      setForm({
        store_name: res.data.store_name || "",
        description: res.data.description || "",
        business_address: res.data.business_address || "",
        store_logo: null,
      });
    } else {
      setApp(null); 
    }

  } catch (err) {
    setApp(null);
  } finally {
    setLoadingApp(false);
  }
};


  // Auto redirect if approved
  useEffect(() => {
    if (app?.status === "approved") {
      navigate("/seller/dashboard");
    }
  }, [app]);

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("store_name", form.store_name);
      payload.append("description", form.description);
      payload.append("business_address", form.business_address);
      if (form.store_logo) payload.append("store_logo", form.store_logo);

      let res;
      if (!app) {
        res = await createSellerApplication(payload);
        toast.success("Application Submitted!");
      } else {
        res = await updateSellerApplication(app.id, payload);
        toast.success("Application Updated!");
      }

      setApp(res.data);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Error occurred");
    }
  };

  const onDelete = async () => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteSellerApplication();
      setApp(null);
      setForm({
        store_name: "",
        store_logo: null,
        description: "",
        business_address: "",
      });
      toast.success("Application Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const onReapply = () => {
    setApp(null);
    setForm({
      store_name: "",
      store_logo: null,
      description: "",
      business_address: "",
    });
  };

  if (loadingApp) return <div className="loading">Loading...</div>;

  // ----------------------------------
  // 🔥 UI START
  // ----------------------------------

  return (
    <div className="seller-application-wrapper">
      <h2 className="heading">Seller Application</h2>

      {/* If application exists */}
      {app ? (
        <div className="application-card">
          <div className="status-section">
            <h3>{app.store_name}</h3>

            <p>
              <strong>Status:</strong>{" "}
              <span className={`status ${app.status}`}>
                {app?.status?.toUpperCase()}
              </span>
            </p>

            <p>
              <strong>Description:</strong> {app.description}
            </p>

            <p>
              <strong>Business Address:</strong> {app.business_address}
            </p>
          </div>

          {/* Logo show */}
          {app.store_logo && (
            <div className="logo-box">
              <img
                src={app.store_logo}
                alt="Store Logo"
                className="store-logo"
              />
            </div>
          )}

          {app.status === "pending" && (
            <p className="info-msg">Your application is under review.</p>
          )}

          {app.status === "rejected" && (
            <>
              <p className="error-msg">
                Your application was rejected. You can reapply.
              </p>
              <button className="btn primary" onClick={onReapply}>
                Reapply
              </button>
            </>
          )}

          <div className="button-row">
            {app.status !== "approved" && (
              <>
                <button className="btn secondary" onClick={() => setApp(null)}>
                  Edit Application
                </button>

                <button className="btn danger" onClick={onDelete}>
                  Delete Application
                </button>
              </>
            )}

            {app.status === "approved" && (
              <button
                className="btn success"
                onClick={() => navigate("/seller/dashboard")}
              >
                Go to Seller Dashboard
              </button>
            )}
          </div>
        </div>
      ) : (
        // ----------------------------------
        // 📝 FORM (Create or Edit)
        // ----------------------------------
        <form
          className="form-card"
          onSubmit={onSubmit}
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label>Store Name</label>
            <input
              name="store_name"
              value={form.store_name}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Store Logo</label>
            <input
              type="file"
              name="store_logo"
              accept="image/*"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label>Business Address</label>
            <textarea
              name="business_address"
              value={form.business_address}
              onChange={onChange}
            />
          </div>

          <button className="btn primary" type="submit">
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
}
