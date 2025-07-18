import React from 'react'
import Usecustom from '../customehook/Usecustom'
import { NavLink, Outlet } from 'react-router-dom'
import './admin.css'

function Managproduct() {
  const { data: products } = Usecustom("http://localhost:5000/products")

  return (
    <div>
      <div className='adminnav'>
        <NavLink to='/admin/product' end className={({ isActive }) => (isActive ? 'navactive' : '')}>
          Products
        </NavLink>
        <NavLink to='/admin/product/add' className={({ isActive }) => (isActive ? 'navactive' : '')}>
          Add Product
        </NavLink>
      </div>

      <div className='admin-content'>
        <Outlet />
      </div>
    </div>
  )
}

export default Managproduct
