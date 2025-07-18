import React from 'react'
import './Productscardes.css'

function Productscardes({value}) {
    const { item:product, handeedit, handleremove, handlestatus } = value;

  return (
     <div className="product-card">
      <img src={product.imageUrl} alt={product.title} className="product-img" />

      <div className="product-details">
        <h3>{product.title}</h3>
        <p>₹ {product.price}</p>
        <p>Category: {product.category}</p>
      </div>

      <div className="product-actions">
        <button className="edit-btn" onClick={()=>{handeedit(product.id)}}>Edit</button>
        <button className="remove-btn" onClick={()=>{handleremove(product.id)}}>Remove</button>
        <button className="suspend-btn" onClick={()=>{handlestatus(product)}}>
          {product.status === 'active' ? 'Suspend' : 'Unsuspend'}
        </button>
      </div>
    </div>
  )
}

export default Productscardes