import axios from 'axios'
import React, { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const [formdata, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "user"
  })
  const [error, seterror] = useState("")

  const navigate = useNavigate()
  const changevalue = (event) => {
    setForm(pre => { return { ...pre, [event.target.name]: event.target.value.trim() } })
  }

  const handleReg = async (eve) => {
    eve.preventDefault()

    if (!formdata.name || !formdata.email || !formdata.password || !formdata.confirm) {
      return seterror('pleas fill inputs')
    }
    if (formdata.password !== formdata.confirm) {
      return seterror('incorrect password')
    }
    try {
      const { data } = await axios.get('http://localhost:5000/users', {
        params: {
          email: formdata.email
        }
      })

      if (data.length > 0) {
        return seterror('Already existed')
      }

      axios.post("http://localhost:5000/users", {
        name: formdata.name,
        email: formdata.email,
        password: formdata.password,
        role: "user",
        isblocked:false
      })
      navigate('/login', { replace: true })
      seterror('')

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4 w-100" style={{ maxWidth: "450px" }}>
        <h1 className="text-center mb-4">Register</h1>
        <form action="" onSubmit={handleReg}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name='name' onChange={changevalue} value={formdata.name} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name='email' onChange={changevalue} value={formdata.email} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={formdata.password} onChange={changevalue} />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name='confirm' value={formdata.confirm} onChange={changevalue} />
          </div>
          <div className="d-grid mb-2">
            <button type='submit' className="btn btn-success">Register</button>
          </div>
          {error && <p className="text-danger text-center">{error}</p>}
        </form>
        <div className="text-center mt-3">
          <Link to='/login' className="text-decoration-none">Already have an account?</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
