import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createSellerProductAPI, getCategories } from "../api/products";
import { useNavigate } from "react-router-dom";
import styles from './addproduct.module.css';

export default function SellerCreateProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount_percentage: 0,
    category: "",
    thumbnail: null
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      fd.append(key, value);
    });

    try {
      const res = await createSellerProductAPI(fd);
      toast.success("Product created!");
      navigate(`/seller/products/${res.data.slug}`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create product");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Create New Product</h2>
          <p>Add a new product to your store inventory</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Product Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="name"
              className={styles.input}
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              className={styles.textarea}
              rows="4"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your product..."
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Price (₹) <span className={styles.required}>*</span>
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className={styles.input}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Discount %</label>
              <input
                type="number"
                name="discount_percentage"
                value={form.discount_percentage}
                onChange={handleChange}
                className={styles.input}
                placeholder="0"
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Category <span className={styles.required}>*</span>
            </label>
            <select
              name="category"
              className={styles.select}
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Product Thumbnail</label>
            <div className={styles.fileInputWrapper}>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleChange}
                className={styles.fileInput}
                id="thumbnail"
              />
              <label htmlFor="thumbnail" className={styles.fileLabel}>
                <svg className={styles.uploadIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>{form.thumbnail ? form.thumbnail.name : 'Choose file or drag here'}</span>
              </label>
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => navigate('/seller/products')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.btnPrimary}
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}