import React, { useContext, useState } from 'react'
import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'
import Usecustom from '../customehook/Usecustom'
import { globelcontext } from '../context/userConetxt'
import { Crtcontext } from '../context/CartContext'

function ProductDitails() {
  const {userid}=useParams()
const { data: products } = Usecustom(`http://localhost:5000/products/${userid}`);
  const {cartdata,
    addtocart,}=useContext(Crtcontext)
  const navigate=useNavigate()

  const cartproduct=()=>{
    if(products){
      addtocart(products)
      console.log(products)
      navigate('/cart')
    }  
  }

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
  <h2 className="fw-bold" style={{color:'darksalmon'}}> Product Details</h2>
  <p className="text-muted">Explore the details, size, color and add to your cart easily.</p>
</div>
      {products && 
        <div className="row g-4">
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <div className="p-3 border rounded bg-white shadow-sm w-100 text-center">
              <img 
                src={`${products.imageUrl}`} 
                alt={`${products.title}`} 
                className="img-fluid rounded"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="p-4 border rounded bg-light shadow-sm h-100 d-flex flex-column justify-content-between">
              <div>
                <h2 className="fw-bold">{products.title}</h2>
                <p className="text-muted">{products.description}</p>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Size</label>
                  <select className="form-select">
                    {products.sizes?.map(sz => (
                      <option key={sz} value={`${sz}`}>{sz}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Color</label>
                  <select className="form-select">
                    {products.colors?.map(col => (
                      <option key={col} value={`${col}`}>{col}</option>
                    ))}
                  </select>
                </div>

                <p className="fw-semibold text-success mt-3">{products.stock} in stock</p>
              </div>

              <div className="text-end mt-4">

                {
                  cartdata?.some((item)=>item.id===products.id)?
                  (<button  className="btn btn-primary px-4 py-2" onClick={()=>{navigate('/cart')}}>
                  🛒 Go to Cart
                  </button>):
                  (<button 
                  onClick={cartproduct} 
                  className="btn btn-primary px-4 py-2"
                >
                  🛒 Add to Cart
                </button>)
                }
                
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default ProductDitails
