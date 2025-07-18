import React, { useContext } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './admin.css'
import { globelcontext } from '../context/userConetxt'

function Adminlayout() {
  const navigate = useNavigate()
  const {logout}=useContext(globelcontext)
  const handleLogout = () => {
    if(window.confirm('do you want logout')){
     logout()
    navigate(to='/login', { replace: true })
    }
   
  }

  return (
    <div className="admin-container">
      
      <aside className="admin-sidebar" >
        <h2>Admin Panel</h2>
        <nav >
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/product">Products</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h3>Welcome Admin</h3>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Adminlayout
