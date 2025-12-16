import React, { useContext } from 'react'
import { globelcontext } from '../context/userConetxt'
import { Navigate, Outlet } from 'react-router-dom'

function Adminprotected() {
const {user,loading} =useContext(globelcontext)
    if(loading){return <p>loading</p>}
    if(!user || user?.role!="ADMIN"){return <Navigate to='/login' replace/>}

    return  <Outlet/>
  
}

export default Adminprotected