import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css' 
import { wishcontext } from '../context/Wishlist'


function ProductCard({ value: item }) {
const {addtowish}=useContext(wishcontext)
const[liked,uselake]=useState(false)
const wishhandle=()=>{
  addtowish(item)
  uselake(pre=>!pre)
}
  return (
    <div className={styles.card}>
      <button onClick={wishhandle} className={`${styles.wish} ${liked ?styles.liked :""}`} >   
        <FontAwesomeIcon
      icon={liked ? solidHeart : regularHeart}
      style={{
        fontSize: '24px',
        color: liked ? 'red' : 'gray',
        cursor: 'pointer',
        transition: 'color 0.3s',
      }}
    /></button>

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
