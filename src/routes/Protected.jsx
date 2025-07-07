import React, { useContext } from 'react'
import { globelcontext } from '../context/userConetxt'
import { Navigate,Outlet  } from 'react-router-dom'

function Protected() {
const {user,loading}=useContext(globelcontext);
if(loading){return <p>loading</p>}
return  user ? <Outlet /> :<Navigate to='/login' replace />
  
}

export default Protected