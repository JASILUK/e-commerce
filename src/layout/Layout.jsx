import React from 'react'
import Navabar from '../components/navabar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <Navabar/>
    <main><Outlet/></main>
    <Footer/>
    </>
  )
}

export default Layout