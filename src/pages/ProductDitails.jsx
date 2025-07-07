import React, { useContext, useState } from 'react'
import {  Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'
import Usecustom from '../customehook/Usecustom'
import { globelcontext } from '../context/userConetxt'
import { Crtcontext } from '../context/CartContext'

function ProductDitails() {
const {userid}=useParams()
const {products}=Usecustom(`http://localhost:5000/products/${userid}`)
const {addtocart}=useContext(Crtcontext)
const navigate=useNavigate()
const cartproduct=()=>{
    if(products){
        addtocart(products)
        console.log(products)
    navigate('/cart')
    }  
}


  return (
    <div>
        { products && <div>
            <div>
                <div><img src={`${products.imageUrl}`} alt={`${products.title}`} /></div>
            </div>
            <div>
                <h1>{products.title}</h1>
                <p>{products.description}</p>
                <p>Size</p>
                <select name="" id="">
                        {products.sizes?.map(sz=><option key={sz} value={`${sz}`}>{sz}</option>)}

                </select>
                <p>Color</p>
                    <select name="" id="">
                        {products.colors?.map(col=><option key={col} value={`${col}`}>{col}</option>)}
                    </select>

                <p>{products.stock} in stock</p>

            </div>
        </div>}
     {products && <button onClick={cartproduct}>Cart</button>}

    </div>
  )
}

export default ProductDitails