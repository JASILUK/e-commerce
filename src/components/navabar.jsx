import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';
import { globelcontext } from '../context/userConetxt';
import logo from  '../assets/logo.png'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Crtcontext } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { wishcontext } from '../context/Wishlist';


function Navabar() {
  const { user, logout } = useContext(globelcontext);
  const [scrll, setscroll] = useState(false);
  const navigate = useNavigate();
  const { cartdata } = useContext(Crtcontext);
  const {wishlistdata} =useContext(wishcontext)


  useEffect(() => {
    const scrollfunc = () => {
      setscroll(window.scrollY > 40);
    };
    window.addEventListener('scroll', scrollfunc);
    return () => window.removeEventListener('scroll', scrollfunc);
  }, []);

 const handleLogout = () => {
  const confirmLogout = window.confirm("Do you want to log out?");
  if (confirmLogout) {
    logout();
    navigate('/collection', { replace: true });
  }
};


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
          {cartdata.length > 0 && (
            <span className={styles.cartcount}>{cartdata.length}</span>
            )}
        </NavLink>

      {user ? (
        <div className={styles.userBox}>
          <span className={styles.username}>Hi, {user.name}</span>
          <button onClick={handleLogout} className={styles.logoutbtn}>Logout</button>
        </div>
      ) : (
        <NavLink to='/login' className={styles.navlink}>Login</NavLink>
      )}

    
</div>
    </div>
  );
}

export default Navabar;
