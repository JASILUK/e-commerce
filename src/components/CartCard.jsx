import React, { useContext } from 'react';
import styles from './cartcard.module.css';
import { Crtcontext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

function CartCard({ cartobj }) {
  const { removeitem, increaseQuantity, decreaseQuantity } = useContext(Crtcontext);

  const remove = () => removeitem(cartobj.id);
  const inchandle = () => increaseQuantity(cartobj.id);
  const dichandle = () => decreaseQuantity(cartobj.id);
  const navigate=useNavigate()

  return (
    <div className={`card shadow-sm mb-4 p-3 ${styles.cardparent}`}>
      
      <div className="row g-3 align-items-center">
        <div className="col-md-4 text-center">
          <img src={cartobj.imageUrl} alt={cartobj.title} className={styles.image} onClick={()=>{navigate(`/product/${cartobj.id}`)}}/>
        </div>
        

        <div className="col-md-8">
          <div className={styles.details}>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="fw-bold">{cartobj.title}</h5>
              <button onClick={remove} className={styles.removebtn}>✖️</button>
            </div>

            <p className="text-muted small">{cartobj.description}</p>

            <div className="mb-2">
              <label className="me-2">Size:</label>
              <select className="form-select form-select-sm w-auto d-inline">
                {cartobj.sizes?.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label className="me-2">Color:</label>
              {cartobj.colors?.map((col, ind) => (
                <span key={ind} className={styles.colorDot} style={{ backgroundColor: col }}></span>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <strong className="fs-5">₹{cartobj.price * cartobj.quantity}</strong>
              <div className="d-flex align-items-center">
                <button onClick={dichandle} className={`${styles.incdic} ${cartobj.quantity==1 ? styles.disable :''}`}>−</button>
                <span className="mx-2 fw-bold">{cartobj.quantity}</span>
                <button onClick={inchandle} className={`${styles.incdic} ${cartobj.quantity==5 ? styles.disable :''}`}>＋</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
