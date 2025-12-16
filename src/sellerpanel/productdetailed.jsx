import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Plus, Edit, Image as ImageIcon, Layers,Trash2  } from "lucide-react";
// Assuming this API is correctly imported
import { getSellerProductDetailAPI, toggleProductStatusAPI } from "../api/products"; 

// Import the CSS Module
import styles from "./productdetailed.module.css"; 
import ColorSelector from "../components/seller/colorselecter";
import EditProductModal from "../components/seller/edit product";
import AddGeneralImages from "../components/seller/genimageupload";
import ImageMenu from "../components/seller/genimagemodal";

export default function SellerProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showColorSelector,setShowColorSelector] =useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);  // add
     const [tempSrc, setTempSrc] = useState(null);




  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    setLoading(true);
    

    try {
        const res = await getSellerProductDetailAPI(slug); 
        setProduct(res.data); 
        console.log(res.data)
    } catch (err) {
        toast.error("Failed to load product");
    } finally {
        setLoading(false);
    }
  };


  const handleToggleStatus = async () => {
  if (updatingStatus) return;

  setUpdatingStatus(true);

  try {
    await toggleProductStatusAPI(slug, !product.is_active);

    toast.success(
      `Product ${product.is_active ? "deactivated" : "activated"}`
    );

    setProduct((prev) => ({
      ...prev,
      is_active: !prev.is_active
    }));
  } catch (err) {
    toast.error("Failed to update product status");
  } finally {
    setUpdatingStatus(false);
  }
};

const handleDelete = async () => {
  try {
    await deleteSellerProductAPI(slug);
    toast.success("Product deleted");
    setShowDeleteModal(false);
    navigate("/seller/products"); // or wherever you list products
  } catch (err) {
    toast.error("Delete failed");
  }
};

const handleEdit = (id, file) => {
    // 1. instant UI update
    const url = URL.createObjectURL(file);
    setTempSrc(url);

    // 2. optional: revoke old url when real url arrives from server
    setProduct((p) => ({
      ...p,
      general_images: p.general_images.map((i) =>
        i.id === id ? { ...i, genral_image: url } : i
      ),
    }));
  };



  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!product) return <p className={styles.notFound}>Product not found</p>;

  return (
    <div className={styles.container}>
      {showEditModal && (
  <EditProductModal
    slug={slug}
    onClose={() => setShowEditModal(false)}
    onSuccess={loadProduct}
  />
)}


      {/* HEADER: TITLE & EDIT BUTTON */}
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>{product.name}</h2>
        <button
          onClick={() => setShowEditModal(true) }
          className={`${styles.actionButton} ${styles.editButton}`}
        >
          <Edit size={20} /> Edit Product
        </button>
        <button
      onClick={() => setShowDeleteModal(true)}
      className={`${styles.actionButton} ${styles.deleteButton}`}
    >
      <Trash2 size={20} /> Delete
    </button>
    {showDeleteModal && (
  <div className={styles.modalOverlay} onClick={() => setShowDeleteModal(false)}>
    <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
      <h3>Delete Product</h3>
      <p>Are you sure? This action cannot be undone.</p>

      <div className={styles.actions}>
        <button
          className={`${styles.btn} ${styles.cancel}`}
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>
        <button
          className={`${styles.btn} ${styles.deleteConfirm}`}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
      </div>

      {/* PRODUCT INFO CARD */}
      <div className={styles.infoCard}>
        <div className={styles.infoOverview}>
          {/* Thumbnail */}
          {product.thumbnail_url ? (
            <img
              src={product.thumbnail_url}
              alt="thumb"
              className={styles.thumbnail}
            />
          ) : (
            <div className={styles.thumbnailPlaceholder}>
              No Image
            </div>
          )}

          <div className={styles.infoDetails}>
            <p className={styles.detailItem}>
              <span className={styles.detailLabel}>Price:</span> ₹{product.price}
            </p>
            <p className={styles.detailItem}>
              <span className={styles.detailLabel}>Discount:</span> {product.discount_percentage}%
            </p>
            <p className={styles.detailItem}>
              <span className={styles.detailLabel}>Final Price:</span> 
              <span className={styles.finalPrice}>₹{product.final_price}</span>
            </p>
            <p className={styles.detailItem}>
  <span className={styles.detailLabel}>Status:</span>
          <span 
          className={`${product.is_active ? styles.active : ""}`}>
          {product.is_active ? "Active" :"Inactive"}
          </span>


  <button
    onClick={handleToggleStatus}
    disabled={updatingStatus}
    className={`${styles.statusToggle} ${product.is_active ? styles.active : ""}`}
    aria-label="Toggle product status"
  />
</p>

            <p className={styles.detailItem}>
              <span className={styles.detailLabel}>Blocked:</span> 
              <span className={product.is_blocked ? styles.blockedYes : styles.blockedNo}>
                {product.is_blocked ? "Yes" : "No"}
              </span>
            </p>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className={styles.descriptionSection}>
            <p className={styles.descriptionText}>{product.description}</p>
          </div>
        )}
      </div>

      {/* GENERAL IMAGES SECTION */}
<div className={styles.section}>
  <div className={styles.sectionHeader}>
    <h3 className={styles.sectionTitle}>General Images</h3>

    {/* NEW – sits top-right */}
    <AddGeneralImages slug={slug} onSuccess={loadProduct} />
  </div>

  {/* existing grid stays untouched */}
  {product.general_images.length === 0 ? (
    <p className={styles.emptyState}>No general images uploaded.</p>
  ) : (
    <div className={styles.imageGrid}>
    {product.general_images.map((img) => (
  <div key={img.id} className={styles.imageThumb}>
    <img src={img.genral_image} alt="" className={styles.generalImage} />
    <ImageMenu
      slug={slug}
      imgId={img.id}
      imgUrl={img.genral_image}
      onDelete={(id) => setProduct((p) => ({ ...p, general_images: p.general_images.filter((i) => i.id !== id) }))}
      onEdit={(id, file) => handleEdit(id,file)}
    />
  </div>
))}
    </div>
  )}
</div>

      {/* VARIANTS SECTION */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Variants (Colors)</h3>
          <button
            className={`${styles.actionButton} ${styles.variantButton}`}
            onClick={() => setShowColorSelector(true)}
          >
            <Plus size={20} /> Add Colors
          </button>

          

        </div>
        {showColorSelector && (
        <ColorSelector
          slug={slug}
          onSuccess={loadProduct}
        />
)}

        {product.colors.length === 0 ? (
          <p className={styles.emptyState}>No color variants added.</p>
        ) : (
          <div className={styles.variantList}>
            {product.colors.map((color) => (
              <div key={color.id} className={styles.variantCard}>
                
                {/* COLOR HEADER & MANAGE BUTTON */}
                <div className={styles.variantHeader}>
                  <div>
                    <p className={styles.variantColorName}>
                      {color.color.name}
                    </p>

                    <p className={styles.colorCodeDisplay}>
                      <span
                        className={styles.colorSwatch}
                        style={{ backgroundColor: color.color.code }}
                      ></span>
                      {color.color.code}
                    </p>

                    <p className={styles.totalStock}>
                      Total Stock:{" "}
                      <span className={styles.stockValue}>
                        {color.variants.reduce((acc, v) => acc + v.stock, 0)}
                      </span>
                    </p>
                  </div>

                  <button className={`${styles.actionButton} ${styles.manageButton}`}>
                    <Layers size={20} /> Manage
                  </button>
                </div>

                {/* COLOR IMAGES */}
                <div className={styles.colorImageStrip}>
                  {color.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.image_url}
                      alt={`${color.color.name} variant`}
                      className={styles.colorImage}
                    />
                  ))}
                </div>

                {/* COLOR VARIANTS (SIZES) */}
                <div className={styles.sizeSection}>
                  <h4 className={styles.sizeSectionTitle}>Sizes & Inventory</h4>

                  <div className={styles.sizeGrid}>
                    {color.variants.map((v) => (
                      <div key={v.id} className={styles.sizeCard}>
                        <p className={styles.sizeName}>Size: **{v.size}**</p>
                        <p className={styles.sizeStock}>Stock: {v.stock}</p>
                        <p className={styles.sizeSku}>SKU: {v.sku}</p>
                      </div>
                    ))}
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