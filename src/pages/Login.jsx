import React, { useContext, useState } from 'react'
import { globelcontext } from '../context/userConetxt'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { googleLogeAPI } from '../api/auth';
import { useCart } from '../context/CartContext';


function Login() {
 const { login,resendEmail } = useContext(globelcontext);
 const {refreshCart }  = useCart()

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await login({ email, password });
    await refreshCart()
    if (result.success) {
      toast.success('loged successfull')
      if (res.user?.role === 'SELLER') navigate('/seller/dashboard');
      else if (res.user?.role === 'ADMIN') navigate('/admin/dashboard');
      else navigate('/collection');
      return;
    }

    setErrorMsg(result.message);

   if (result.message?.toLowerCase().includes("not verified")) {
    setNeedsVerification(true);
}

  };

const handleResend = async () => {
  const ok = await resendEmail(email);
  if (ok) toast.info("Verification email sent again!");
  else toast.error("Failed to resend verification email");
};



  const handlegoogle = async (credentialResponse) => {
  try {
    const { data } = await googleLogeAPI({ token: credentialResponse.credential });
    toast.success(data.detail || "Logged in with Google!");
    login({user:data.user},data);  
      await refreshCart()
    navigate("/collection");
  } catch (err) {
    const message =
      err?.response?.data?.detail ||
      err?.response?.data?.message ||
      "Google Login Failed";
    toast.error(message);
  }
};
  return (<GoogleOAuthProvider clientId="572366985213-hvhecnc2ff5pqr585qcbek3obhdhe970.apps.googleusercontent.com">
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">LogIn Here</h2>
        <div>
          {needsVerification && ( 
          <button onClick={handleResend} className="btn btn-warning">
              Resend Verification Email
            </button>
          )}
                    <GoogleLogin
            onSuccess={handlegoogle}
            onError={() => toast.error("Google Login Error")}
          />
          <hr />

          <form action="" onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="text" className="form-control" name='email' value={email} onChange={(eve)=> setEmail(eve.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={password} onChange={(eve)=> setPass(eve.target.value)} required />
            </div>
            <div className="d-grid mb-2">
              <button type='submit' className="btn btn-primary">Log In</button>
            </div>
            {errorMsg && <p className="text-danger text-center">{errorMsg}</p>}
          </form>
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-outline-secondary btn-sm" onClick={()=>navigate ('/register')}>Register</button>
        </div>
      </div>
    </div></GoogleOAuthProvider>
  )
}

export default Login
