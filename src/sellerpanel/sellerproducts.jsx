import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Filter, Edit, Eye, MoreVertical, Package,
  AlertCircle, CheckCircle, XCircle
} from 'lucide-react';
import styles from './SellerProducts.module.css';
import { getproducts } from '../api/sellerapi';
import { toast } from 'react-toastify';

function SellerProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    blocked: 0,
  });

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDropdown, setShowDropdown] = useState(null);

  // --------------------------
  // FETCH PRODUCTS FROM BACKEND
  // --------------------------
  useEffect(() => {
    async function loadData() {
      try {
        const res = await getproducts();

        // Ensure backend structure
        setProducts(res.data.products || []);
        setStats(res.data.stats || { total: 0, active: 0, inactive: 0, blocked: 0 });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // --------------------------
  // FILTERING
  // --------------------------
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === 'all'
        ? true
        : filterStatus === 'active'
        ? product.is_active && !product.is_blocked
        : filterStatus === 'inactive'
        ? !product.is_active
        : filterStatus === 'blocked'
        ? product.is_blocked
        : true;

    return matchesSearch && matchesFilter;
  });

  // --------------------------
  // STATUS BADGE
  // --------------------------
  const getStatusBadge = (product) => {
    if (product.is_blocked) {
      return (
        <span className={`${styles.badge} ${styles.badgeBlocked}`}>
          <XCircle size={14} /> Blocked
        </span>
      );
    }
    if (product.is_active) {
      return (
        <span className={`${styles.badge} ${styles.badgeActive}`}>
          <CheckCircle size={14} /> Active
        </span>
      );
    }
    return (
      <span className={`${styles.badge} ${styles.badgeInactive}`}>
        <AlertCircle size={14} /> Inactive
      </span>
    );
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            <Package size={28} />
            My Products
          </h1>
          <p className={styles.subtitle}>Manage your product inventory</p>
        </div>
        <button
          className={styles.addBtn}
          onClick={() => navigate('/seller/products/create')}
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{background: '#e3f2fd'}}>
            <Package size={24} color="#1976d2" />
          </div>
          <div className={styles.statInfo}>
            <h3>{stats.total}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{background: '#e8f5e9'}}>
            <CheckCircle size={24} color="#388e3c" />
          </div>
          <div className={styles.statInfo}>
            <h3>{stats.active}</h3>
            <p>Active</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{background: '#fff3e0'}}>
            <AlertCircle size={24} color="#f57c00" />
          </div>
          <div className={styles.statInfo}>
            <h3>{stats.inactive}</h3>
            <p>Inactive</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{background: '#ffebee'}}>
            <XCircle size={24} color="#d32f2f" />
          </div>
          <div className={styles.statInfo}>
            <h3>{stats.blocked}</h3>
            <p>Blocked</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <Filter size={18} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className={styles.productsCard}>
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <Package size={64} className={styles.emptyIcon} />
            <h3>No products found</h3>
            <p>Try adjusting filters</p>
          </div>
        ) : (
          <div className={styles.productsList}>
            {filteredProducts.map((product) => (
              <div key={product.slug} className={styles.productCard}>
                {/* IMAGE */}
                <div className={styles.productImage}>
                  {product.thumbnail_url ? (
                    <img src={product.thumbnail_url} alt={product.name} />
                  ) : (
                    <div className={styles.noImage}>
                      <Package size={32} />
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>₹{product.price}</p>
                  <div className={styles.productStatus}>
                    {getStatusBadge(product)}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className={styles.productActions}>
                  <button
                    className={styles.actionBtn}
                    onClick={() =>
                      navigate(`/seller/products/${product.slug}`)
                    }
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    className={styles.actionBtn}
                    onClick={() =>
                      navigate(`/seller/products/${product.slug}/edit`)
                    }
                  >
                    <Edit size={18} />
                  </button>

                  <div className={styles.dropdownWrapper}>
                    <button
                      className={styles.actionBtn}
                      onClick={() =>
                        setShowDropdown(
                          showDropdown === product.slug ? null : product.slug
                        )
                      }
                    >
                      <MoreVertical size={18} />
                    </button>

                    {showDropdown === product.slug && (
                      <div className={styles.dropdown}>
                        <button>
                          {product.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button>Duplicate</button>
                        <button className={styles.deleteBtn}>Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerProducts;
