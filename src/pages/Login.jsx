import React, { useContext, useState } from 'react'
import { globelcontext } from '../context/userConetxt'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

const {login}=useContext(globelcontext)
const [email,setemail]=useState("")
const [password,setpass]=useState("")
const [block,setblock]=useState(false)
const navigat=useNavigate()
const[erroor,seterror]=useState(false)
const changemail=(event)=>{
    setemail(event.target.value.trim())
}
const chhangepass=(event)=>{
    setpass(event.target.value.trim())
}

const handlesubmit = async (eve) => {
  eve.preventDefault();

  if (!email || !password) {
    seterror(true);
    return;
  }

  try {
    const { data: ismatch } = await axios.get(`http://localhost:5000/users`, {
      params: { email: email, password: password }
    }) || [];

    if (ismatch.length > 0) {
      const userin = ismatch[0];
      console.log("🧠 Logged in user:", userin);

      if(userin.isblocked){
        return setblock(true)
      }
      login({
        id: userin.id,
        email: userin.email,
        password: userin.password,
        name: userin.name,
        role: userin.role
      });

      seterror(false);
      setblock(false);
      setemail('');
      setpass('');

      if (userin.role === 'admin') {
        navigat('/admin/dashboard', { replace: true });
      } else if (userin.role === 'user') {
        navigat('/collection', { replace: true });
      } else {
        seterror(true);
      }
    } else {
      seterror(true);
    }
  } catch (err) {
    console.error("Login error:", err);
    seterror(true);
  }
};


  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">LogIn Here</h2>
        <div>
          <form action="" onSubmit={handlesubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="text" className="form-control" name='email' value={email} onChange={changemail} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={password} onChange={chhangepass} required />
            </div>
            <div className="d-grid mb-2">
              <button type='submit' className="btn btn-primary">Log In</button>
            </div>
            {erroor && <p className="text-danger text-center">incorrect password or email</p>}
            {block && <p  className="text-danger text-center"> your account is blocked</p>}
          </form>
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-outline-secondary btn-sm" onClick={()=>navigat('/register')}>Register</button>
        </div>
      </div>
    </div>
  )
}

export default Login
