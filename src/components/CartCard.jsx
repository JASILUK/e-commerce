import React from "react";
import styles from "./cartcard.module.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CartCard({ cartobj }) {
  const { removeCartItem, updateCartItem } = useCart();
  const navigate = useNavigate();


  const handleQuantityChange = async (newQty) => {
  const result = await updateCartItem(cartobj.variant.id, newQty);

  result.success ? toast.success(result.msg) : toast.error(result.msg);
};
const removeItem = async () => {
  const result = await removeCartItem(cartobj.variant.id);

  result.success ? toast.success(result.msg) : toast.error(result.msg);
};


  const increaseQty = () =>
     handleQuantityChange(cartobj.quantity + 1);

  const decreaseQty = () =>
    handleQuantityChange( cartobj.quantity - 1);

  return (
    <div className={`card shadow-sm mb-4 p-3 ${styles.cardparent}`}>
      <div className="row g-3 align-items-center">
        
        {/* PRODUCT IMAGE */}
        <div className="col-md-4 text-center">
          <img
            src={cartobj.variant?.thumbnail}
            alt={cartobj.variant?.title}
            className={styles.image}
            onClick={() => navigate(`/product/${cartobj.variant.slug}`)}
          />
        </div>

        {/* DETAILS */}
        <div className="col-md-8">
          <div className={styles.details}>

            {/* TITLE + REMOVE */}
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="fw-bold">{cartobj.variant?.product_name}</h5>
              <button onClick={removeItem} className={styles.removebtn}>✖️</button>
            </div>

            {/* DESCRIPTION */}
            <p className="text-muted small">{cartobj.variant?.description}</p>

            {/* COLOR */}
        <div className={styles.detailRow}>
          <label>Color:</label>
          <span
            className={styles.colorDot}
            style={{ backgroundColor: cartobj.variant.color_name }}
          ></span>
          <span className="ms-2">{cartobj.variant.color_name}</span>
        </div>

        {/* SIZE */}
        <div className={styles.detailRow}>
          <label>Size:</label>
          <span>{cartobj.variant.size}</span>
        </div>

              <p >price :  ₹{cartobj.price_at_add}</p>

            {/* PRICE + QTY */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <strong className="fs-6">Total :₹{cartobj.item_total_price}</strong>

              <div className="d-flex align-items-center">

                <button
                  onClick={decreaseQty}
                  className={`${styles.incdic} ${
                    cartobj.quantity === 1 ? styles.disable : ""
                  }`}
                >
                  −
                </button>

                <span className="mx-2 fw-bold">{cartobj.quantity}</span>

                <button
                  onClick={increaseQty}
                  className={`${styles.incdic} ${
                    cartobj.quantity === 5 ? styles.disable : ""
                  }`}
                >
                  ＋
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default CartCard;
