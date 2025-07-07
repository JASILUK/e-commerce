import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css' 

function ProductCard({ value: item }) {
  return (
    <div className={styles.card}>
      <Link to={`/product/${item.id}`} style={{textDecoration:"none"}}><div style={{padding:"5px"}}> 
        <img src={item.imageUrl} alt={item.title} className={styles.image} />
        </div>
        <div className={styles.details}>
          <h3 className={styles.title}>{item.title}</h3>
          <div className={styles.priceRow}>
            <span className={styles.price}>₹{item.price}</span>
            {item.discount > 0 && (
              <span className={styles.discount}>-{item.discount}%</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
