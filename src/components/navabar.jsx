import React, { useContext, useEffect, useState } from 'react'
import {  NavLink, useNavigate} from 'react-router-dom'
import styles from './navbar.module.css'
import { globelcontext } from '../context/userConetxt'
import logo from '../assets/logo.png'
function Navabar() {
  const {user,logout}=useContext(globelcontext)
  const[scrll,setscroll]=useState(false)
  const navigate=useNavigate()
  useEffect(()=>{
    const scrollfunc=()=>{
      if (window.scrollY>40){
        setscroll(true)
      }else{
        setscroll(false)
      }
    }
  window.addEventListener('scroll',scrollfunc)

  return ()=> window.removeEventListener('scroll',scrollfunc)
  },[])
  
  return (
    <div className={ `${styles.navbar}  ${(scrll)?styles.scrolling:""}`}>
    <NavLink to='/' style={{textDecoration:"none"}}> <span className={styles.logopng}><img src={logo} alt="" className={styles.logo}/></span></NavLink>
    <NavLink to='/collection' style={{textDecoration:"none"}}><span  className={styles.navlink}>COLECTIONS</span></NavLink>
    <NavLink to='/men'  style={{textDecoration:"none"}}><span className={styles.navlink}>MEN</span></NavLink>
    <NavLink to='/women' style={{textDecoration:"none"}}><span className={styles.navlink}>WOMEN</span></NavLink>
    <NavLink to='/kids' style={{textDecoration:"none"}}><span className={styles.navlink}>KIDS</span></NavLink>
    <NavLink to='/support' style={{textDecoration:"none"}}><span className={styles.navlink}>SUPPORT</span></NavLink>

    {(user)?
    <span>Hi,{user.name} <button onClick={()=>{logout();console.log('hiiiiiiiiiiii');navigate('/login',{replace:true}); }}>LogOut</button></span>
    : <NavLink to='/login'><span className={styles.navlink}>Login</span></NavLink>}
    


    </div>
  )
}

export default Navabar