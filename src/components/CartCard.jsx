import React, { useContext } from 'react'
import steyls from './cartcard.module.css'
import Checkout from '../pages/Checkout';
import { Crtcontext } from '../context/CartContext';

function CartCard({cartobj}) {
    console.log(cartobj);
    const{removeitem,increasqty,dicreasqty}=useContext(Crtcontext)
    const remove=()=>{
        removeitem(cartobj)
    }
    const inchandle=()=>{
        increasqty(cartobj)
    }
    const dichandle=()=>{
        dicreasqty(cartobj)
    }
    
  return (
   <div className={steyls.cardparent}>
  <div className={steyls.imagediv}>
    <img src={`${cartobj.imageUrl}`} alt="" />
  </div>

  <div className={steyls.discdiv}>
    <div style={{ position: 'relative' }}>
      <button
        onClick={remove}
        style={{ position: 'absolute', right: '0',backgroundColor:'white',border:'none'}}
      >
        ✖️
      </button>

      <h3 style={{ margin: '0' }}>{cartobj.title}</h3>
    </div>

    <p>{cartobj.description}</p>

    <div>
      <select name="size" id={cartobj.id}>
        {cartobj.sizes?.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
    <div>
    {cartobj.colors?.length > 0
      ? cartobj.colors.map((col, ind) => (
          <label key={ind}>
            <input
              type="checkbox"
              value={col}
              style={{ display: "none" }}
            />
            <span
              style={{
                backgroundColor: col,
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                display: "inline-block",
                margin: "2px",
                border: "1px solid gray",
              }}
            ></span>
          </label>
        ))
      : null}
        </div>
    <p>
      <strong>₹{(cartobj.price)*cartobj.quantity}</strong>
    </p>
    <div style={{display:'flex',justifyContent:'end',gap:'10px'}}>
        <button onClick={dichandle} className={steyls.incdic}>-</button>
        <button onClick={inchandle} className={steyls.incdic}>+</button>
    </div>
    <label htmlFor="">{cartobj.quantity}</label>
  </div>
</div>

  )
}

export default CartCard