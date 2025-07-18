import React, { useContext } from 'react'
import { globelcontext } from '../context/userConetxt'
import { Navigate, Outlet } from 'react-router-dom'


function Nonelogrout() {
const {user}=useContext(globelcontext)
if(!user){return <Outlet/> }
if(user?.role=="admin"){return <Navigate to='/admin/dashboard' replace />}
  return  <Navigate to='/collection' replace />

}

export default Nonelogrout