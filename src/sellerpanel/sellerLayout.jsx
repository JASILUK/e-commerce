import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  DollarSign,
  Settings,
  Store,
  Menu,
  X,
  ArrowLeft,
  Home
} from "lucide-react";

import styles from "./sellerlayout.module.css";

function SellerLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: "/seller/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/seller/products", icon: Package, label: "My Products" },
    { to: "/seller/orders", icon: ShoppingCart, label: "Orders" },
    { to: "/seller/earnings", icon: DollarSign, label: "Earnings" },
    { to: "/seller/settings", icon: Settings, label: "Settings" }
  ];

  return (
    <div className={styles.wrapper}>
      
      {/* ---------- MOBILE TOP HEADER ---------- */}
      <header className={styles.mobileHeader}>
        <button className={styles.menuBtn} onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>

        <div className={styles.mobileTitle}>
          <Store size={22} />
          <span>Seller Hub</span>
        </div>

        <button 
          className={styles.backBtn}
          onClick={() => navigate("/collection")}
        >
          <ArrowLeft size={20} />
        </button>
      </header>

      {/* ---------- SIDEBAR ---------- */}
      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}>
        
        {/* Close button (mobile only) */}
        <button className={styles.closeBtn} onClick={() => setOpen(false)}>
          <X size={26} />
        </button>

        {/* Brand Logo */}
        <div className={styles.brand}>
          <Store size={32} className={styles.brandIcon} />
          <h3>Seller Hub</h3>
          <p>Manage your store</p>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              to={to}
              key={to}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.navActive : ""}`
              }
              onClick={() => setOpen(false)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
          <NavLink
            to="/collection"
            key="/collection"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navActive : ""}`
            }
            onClick={() => setOpen(false)}
          >
            <Home size={18}/>
            <span>Go to Collection</span>
          </NavLink>
        </nav>

        {/* Help Box */}
        <div className={styles.helpBox}>
          <h6>Need Help?</h6>
          <p>Access seller tutorials & guides</p>
          <button className={styles.helpBtn}>View Resources</button>
        </div>
      </aside>

      {/* MOBILE OVERLAY - Only shows on mobile when sidebar is open */}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

      {/* ---------- PAGE CONTENT ---------- */}
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default SellerLayout;