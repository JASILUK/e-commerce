import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';
import { globelcontext } from '../context/userConetxt';
import logo from  '../assets/logo.png'
import '@fortawesome/fontawesome-free/css/all.min.css';
import {  useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { wishcontext } from '../context/Wishlist';


function Navabar() {
  const { user, logout } = useContext(globelcontext);
  const [scrll, setscroll] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useCart()
  const {wishlistdata} =useContext(wishcontext)
  const [showLogoutBox, setShowLogoutBox] = useState(false);



  useEffect(() => {
    const scrollfunc = () => {
      setscroll(window.scrollY > 40);
    };
    window.addEventListener('scroll', scrollfunc);
    return () => window.removeEventListener('scroll', scrollfunc);
  }, []);

 


  return (
    <div className={`${styles.navbar} ${scrll ? styles.scrolling : ''}` }>
      
      <NavLink to='/' style={{ textDecoration: 'none' }} className={styles.loglink}>
        <span style={{color:"orange"}}>Florza</span>
        <span className={styles.logopng}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </span>
      </NavLink>
    <div className={styles.jsutify}>
      <NavLink to='/collection' className={styles.navlink}>COLLECTIONS</NavLink>
     
      <NavLink to='/support' className={styles.navlink}>SUPPORT</NavLink>
 
 
        { user && (
          <>
            { user.role === 'BUYER' && (
              <NavLink to="/seller-application" className={styles.navlink}>
                Apply as Seller
                { 
                  user?.seller_profile?.status === 'pending' && <span className={styles.badge}>Pending</span>
                }
              </NavLink>
            )}

            { user.role === 'SELLER' && (
              <NavLink to="/seller/dashboard" className={styles.navlink}>Seller Dashboard</NavLink>
            )}
          </>
        )}
{user && (
  <NavLink to="/orders" className={styles.navlink}>
    My Orders
  </NavLink>
)}


      <NavLink to='/wishlist' style={{position:'relative'}}>
         <FontAwesomeIcon
              icon={ solidHeart }
              style={{
                fontSize: '20px',
                color: 'white',
                cursor: 'pointer',
                transition: 'color 0.3s',
              }}
            />
            {
              wishlistdata?.length>0 && <span className={styles.cartcount}>{wishlistdata.length}</span> 
            }

      </NavLink>

        <NavLink to='/cart' className={styles.carticon} style={{ position: 'relative' }}>
           <i className="fas fa-shopping-cart"></i>
          {totalItems > 0 && (
            <span className={styles.cartcount}>{totalItems}</span>
            )}
        </NavLink>
        

      {user ? (
  <div className={styles.userBox}>
    <span className={styles.username}>Hi, {user.username}</span>

    <button 
      onClick={() => setShowLogoutBox(!showLogoutBox)} 
      className={styles.logoutbtn}
    >
      Logout
    </button>

  
    {showLogoutBox && (
      <div className={styles.logoutPopup}>
        <p>Are you sure?</p>
        <div className={styles.popupButtons}>
          <button 
            className={styles.confirmBtn} 
            onClick={ async () => {
              setShowLogoutBox(false);
              await logout();

              navigate('/collection');
            }}
          >
            Yes, Logout
          </button>

          <button 
            className={styles.cancelBtn} 
            onClick={() => setShowLogoutBox(false)}
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
      </div>
    )}

  </div>
) : (
  <NavLink to='/login' className={styles.navlink}>Login</NavLink>
)}

    
</div>
    </div>
  );
}

export default Navabar;
