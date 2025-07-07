import React from 'react'
import{Route,Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Collection from '../pages/Collection'
import ProductDitails from '../pages/ProductDitails'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Protected from './Protected'

function Publicrout() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/product/:userid' element={<ProductDitails/>}/>
        <Route element={<Protected/>}>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='checkout/:cartid' element={<Checkout/>}/>
        </Route>
    </Routes>

    
  )
}

export default Publicrout