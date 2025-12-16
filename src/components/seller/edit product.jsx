import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCategories, getEditProductAPI,updateSellerProductAPI } from "../../api/products";
import styles from "./editstyle.module.css"; 
export default function EditProductModal({
  slug,
  onClose,
  onSuccess,
}) {
  const [rootCats, setRootCats] = useState([]);              // 2
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount_percentage: "",
    is_active: true,
    category: "",   // will hold category ID
    thumbnail: null,
  });
  const [loading, setLoading] = useState(true);
  // 1️⃣ Load existing product
  useEffect(() => {
    Promise.all([loadProduct(), loadCats()]).finally(() => setLoading(false));
  }, []);

  const loadProduct = async () => {
    const res = await getEditProductAPI(slug);
    setForm(prev => ({
      ...prev,
      name: res.data.name,
      description: res.data.description,
      price: res.data.price,
      discount_percentage: res.data.discount_percentage,
      is_active: res.data.is_active,
       category: Number(res.data.category),   // ID comes from backend
    }));
  };

  const loadCats = async () => {                // 3
    const { data } = await getCategories();
    setRootCats(data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setForm(p => ({ ...p, thumbnail: files[0] }));
    } else {
      setForm(p => ({
        ...p,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(k => {
      if (form[k] !== null) formData.append(k, form[k]);
    });
    await updateSellerProductAPI(slug, formData);
    toast.success("Product updated");
    onSuccess();
    onClose();
  };





   if (loading) return <p className={styles.loader}>Loading...</p>;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
        <h3>Edit Product</h3>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.input} name="name" value={form.name} onChange={handleChange} required placeholder="Product name" />
          <textarea className={styles.textarea} name="description" value={form.description} onChange={handleChange} placeholder="Description" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <input className={styles.input} type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" />
            <input className={styles.input} type="number" name="discount_percentage" value={form.discount_percentage} onChange={handleChange} placeholder="Discount %" />
          </div>

          <select className={styles.input} name="category" value={form.category} onChange={handleChange} required>
            <option value="" disabled>Select category</option>
            {rootCats.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <label className={styles.checkLabel}>
            <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
            Active
          </label>

          <input className={styles.fileInput} type="file" onChange={handleChange} />

          <div className={styles.actions}>
            <button type="button" className={`${styles.btn} ${styles.cancel}`} onClick={onClose}>Cancel</button>
            <button type="submit" className={`${styles.btn} ${styles.save}`}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}