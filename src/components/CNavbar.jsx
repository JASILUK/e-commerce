import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { globelcontext } from '../context/userConetxt';
import styles from './navbar.module.css';
import logo from '../assets/logo.png';
import { searchcontext } from '../context/Productcontext';
import { getCategories } from '../api/products';

function CNavabar() {
  const { logout, user } = useContext(globelcontext);
  const navigate = useNavigate();
  const {search, setSearch, sort, setSort} = useContext(searchcontext)
  const [categories, setCategories] = useState([]);
  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
  }, []);
   console.log(categories)

  const handleLogout = () => {
    const isconfirm= window.confirm('do you want logout')
    if(isconfirm){
    logout();
    navigate('/collection');
    }
    
  };
  useEffect(() => {
  const timeout = setTimeout(() => {
    setSearch(localSearch);
  }, 500); // realistic debounce (300–500ms)

  return () => clearTimeout(timeout);
}, [localSearch]);


  return (
    <nav className="navbar navbar-expand-lg px-4 py-2 shadow" style={{ backgroundColor:'whitesmoke', color:'black'}}>
  <div className="container-fluid">

  
    {/* HAMBURGER button */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#mainNavbar"
      aria-controls="mainNavbar"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* COLLAPSIBLE NAVBAR CONTENT */}
    <div className="collapse navbar-collapse justify-content-center" id="mainNavbar">

      <ul className="navbar-nav align-items-center gap-3">
          {/* SORT */}
        <li className="nav-item">
          <select
            className="form-select px-3 py-1 rounded shadow-sm border border-secondary"
            style={{ minWidth: '140px' }}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </li>
        {/* SEARCH */}
        <li className="nav-item">
          <input
          type="text"
          value={localSearch}
          placeholder="Search here"
          onChange={(e) => setLocalSearch(e.target.value)}
          className={styles.input}
        />

        </li>

      

        {/* ALL PRODUCTS */}
        <li className="nav-item">
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              isActive ? `${styles.active} ${styles.nav}` : styles.nav
            }
            end
          >
            ALL
          </NavLink>
        </li>

        {/* CATEGORIES + DROPDOWN */}
        {categories.map(cat => (
          <li className="nav-item dropdown" key={cat.slug}>
            <NavLink
              to={`/collection/${cat.slug}`}
              className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.nav}` : styles.nav
              }
            >
              {cat.name}
            </NavLink>

            {cat.subcategory?.length > 0 && (
              <ul className="dropdown-menu">
                {cat.subcategory.map(sub => (
                  <li key={sub.slug}>
                    <NavLink
                      className="dropdown-item"
                      to={`/collection/${sub.slug}`}
                    >
                      {sub.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        

      </ul>
    </div>
  </div>
</nav>

  );
}

export default CNavabar;
