import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { globelcontext } from '../context/userConetxt';
import { Crtcontext } from '../context/CartContext';
import styles from './navbar.module.css';
import logo from '../assets/logo.png';
import { searchcontext } from '../context/Productcontext';


function CNavabar() {
  const { logout, user } = useContext(globelcontext);
  const { cartdata } = useContext(Crtcontext);
  const navigate = useNavigate();
  const {setsearch,setfilter,searchtext} = useContext(searchcontext)

  const handleLogout = () => {
    const isconfirm= window.confirm('do you want logout')
    if(isconfirm){
    logout();
    navigate('/collection');
    }
    
  };

  return (
    <nav className="navbar navbar-expand-lg px-4 py-2 shadow" style={{ backgroundColor:'whitesmoke', color:'black'}}>
       
      <div className="collapse navbar-collapse justify-content-center">
        <ul className="navbar-nav align-items-center gap-3">

           <li className="nav-item">
  <select
    name="filt"
    id="selectfilter"
    onChange={(e) => setfilter(e.target.value)}
    className="form-select px-3 py-1 rounded shadow-sm border border-secondary"
    style={{ minWidth: '140px' }}
  >
    <option value="">Sort by</option>
    <option value="low">Price: Low to High</option>
    <option value="high">Price: High to Low</option>
  </select>
</li>

           <li className="nav-item">
            <input type='text' value={searchtext} placeholder='search here' onChange={(eve)=>{setsearch(eve.target.value)}} className={styles.input}/>
           </li>
           <li className="nav-item">
            <NavLink to='/collection' className={({isActive})=>
            isActive ? `${styles.active} ${styles.nav}`:`${styles.nav}`}end >ALL</NavLink>
                 
          </li>
          <li className="nav-item">
            <NavLink to='/collection/men' className={({isActive})=>
            isActive ? `${styles.active} ${styles.nav}`:`${styles.nav}` } >MEN</NavLink>
                 
          </li>

          <li className="nav-item">
           <NavLink to='/collection/women' className={({isActive})=>
            isActive ? `${styles.active} ${styles.nav}`:`${styles.nav}`}>WOMEN</NavLink>
                
          </li>
          <li className="nav-item">
           <NavLink to='/collection/kids' className={({isActive})=>
            isActive ? `${styles.active} ${styles.nav}`:`${styles.nav}`}>KIDS</NavLink>
          </li>
          
         
        </ul>
      </div>
    </nav>
  );
}

export default CNavabar;
