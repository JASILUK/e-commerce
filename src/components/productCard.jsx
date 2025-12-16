import React, { useContext, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { wishcontext } from "../context/Wishlist";

function ProductCard({ value: item }) {
  const { addtowish } = useContext(wishcontext);
  const [liked, setLiked] = useState(false);

  const images = item.general_images?.map(img => img.image) || [];
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const startImageRotation = () => {
    if (images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 1200);
  };

  const stopImageRotation = () => {
    clearInterval(intervalRef.current);
    setIndex(0);
  };

  const wishhandle = () => {
    addtowish(item);
    setLiked(prev => !prev);
  };

  return (
    <div
      className={styles.card}
      onMouseEnter={startImageRotation}
      onMouseLeave={stopImageRotation}
    >
      <button
        onClick={wishhandle}
        className={`${styles.wish} ${liked ? styles.liked : ""}`}
      >
        <FontAwesomeIcon
          icon={liked ? solidHeart : regularHeart}
          style={{ fontSize: "24px", color: liked ? "red" : "gray" }}
        />
      </button>

      <Link to={`/product/${item.slug}`} style={{ textDecoration: "none" }}>
        <div style={{ padding: "5px" }}>
          <img
            src={images[index] || item.thumbnail_url}
            alt={item.name}
            className={styles.image}
          />
        </div>

        <div className={styles.priceRow}>
          {item.discount_percentage > 0 ? (
            <>
              <span className={styles.originalPrice}>₹{item.price}</span>
              <span className={styles.finalPrice}>₹{item.final_price}</span>
              <span className={styles.discount}>-{item.discount_percentage}%</span>
            </>
          ) : (
            <span className={styles.finalPrice}>₹{item.final_price}</span>
          )}
        </div>
      </Link>
    </div>
  );
}


export default ProductCard;
