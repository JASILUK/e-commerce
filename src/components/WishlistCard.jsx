import React, { useContext } from 'react';
import { wishcontext } from '../context/Wishlist';
import CartContext, { Crtcontext } from '../context/CartContext';

function WishlistCard({value: item }) {
const {addtowish} =useContext(wishcontext)
const {addtocart} =useContext(Crtcontext)
const handleremove=(items)=>{
    addtowish(items)
}
  return (
    <div className="card mb-3 shadow-sm border-0 rounded-3">
      <div className="row g-0">
        <div className="col-md-4 d-flex justify-content-center align-items-center p-2">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="img-fluid rounded"
            style={{ maxHeight: '150px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title fw-bold">{item.title}</h5>
            <p className="card-text text-muted">{item.description}</p>
            <p className="card-text text-success fw-semibold">₹{item.price}</p>

            <div className="d-flex justify-content-between">
              <button
                
                className="btn btn-sm btn-outline-primary"
                onClick={()=>{addtocart(item) ;addtowish(item)}}
              >
                🛒 Move to Cart
              </button>

              <button
                
                className="btn btn-sm btn-outline-danger"
                title="Remove from wishlist"
                onClick={()=>handleremove(item) }
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistCard;
