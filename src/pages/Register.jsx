import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { googleLogeAPI, registerAPI } from "../api/auth";
import { globelcontext } from "../context/userConetxt";

function Register() {
  const [formdata, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();
  const {login} = useContext(globelcontext)

  const changevalue = (e) => {
    setForm({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleReg = async (e) => {
  e.preventDefault();

  if (!formdata.username || !formdata.email || !formdata.password) {
    return toast.error("Please fill all fields");
  }

  if (formdata.password !== formdata.confirmpassword) {
    return toast.error("Password does not match");
  }

  try {
    const res = await registerAPI({
      username: formdata.username,
      email: formdata.email,
      password1: formdata.password,
      password2: formdata.confirmpassword,
    });

    toast.success("Verification email sent! Check your inbox.");
    navigate("/login");

  } catch (err) {

    const message =
      err?.response?.data?.username?.[0] ||
      err?.response?.data?.email?.[0] ||
      err?.response?.data?.password1?.[0] ||
      err?.response?.data?.password2?.[0] ||
      err?.response?.data?.detail ||
      "Registration failed";

    toast.error(message);
  }
};


  const handlegoogle = async (credentialResponse) => {
  try {
    const { data } = await googleLogeAPI({ token: credentialResponse.credential });
    toast.success(data.detail || "Logged in with Google!");
    login({user:data.user},data);  
    navigate("/collection");
  } catch (err) {
    const message =
      err?.response?.data?.detail ||
      err?.response?.data?.message ||
      "Google Login Failed";
    toast.error(message);
  }
};

  return (
    <GoogleOAuthProvider clientId="572366985213-hvhecnc2ff5pqr585qcbek3obhdhe970.apps.googleusercontent.com">
      <div className="container d-flex justify-content-center">
        <div className="card shadow p-4 w-100" style={{ maxWidth: "450px" }}>
          <h1 className="text-center mb-4">Register</h1>

          <GoogleLogin onSuccess={handlegoogle} onError={() => toast.error("Google Error")} />

          <hr />

          <form onSubmit={handleReg}>
            <div className="mb-3">
              <label>Name</label>
              <input name="username" type="text" className="form-control" value={formdata.username} onChange={changevalue} />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input name="email" type="email" className="form-control" value={formdata.email} onChange={changevalue} />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input name="password" type="password" className="form-control" value={formdata.password} onChange={changevalue} />
            </div>

            <div className="mb-3">
              <label>Confirm Password</label>
              <input name="confirmpassword" type="password" className="form-control" value={formdata.confirmpassword} onChange={changevalue} />
            </div>

            <button type="submit" className="btn btn-success w-100">Register</button>
          </form>

          <div className="text-center mt-3">
            <Link to="/login">Already have an account?</Link>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Register;
