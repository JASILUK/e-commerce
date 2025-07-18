import React from 'react'
import Usecustom from '../customehook/Usecustom'
import ProductCard from '../components/productCard'
import Navabar from '../components/navabar'
import { Outlet } from 'react-router-dom'
import CNavabar from '../components/CNavbar'
import Productcontext from '../context/Productcontext'

function Collection() {
  
  return (
    <Productcontext>
    <div style={{backgroundColor:' #f3f4f6	'}}>
            <CNavabar/>

      <Outlet/>
    </div>
    </Productcontext>
  ) 
}

export default Collection