import React, { useContext } from 'react'
import { globelcontext } from '../context/userConetxt'
import { Navigate, Outlet } from 'react-router-dom'

function  AdminorUser() {
    const {user,loading}=useContext(globelcontext)
    if(user?.role=="ADMIN"){return <Navigate to='/admin/dashboard' replace />}
  return <Outlet/>
}

export default AdminorUser