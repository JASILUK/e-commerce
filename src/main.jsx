import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter}  from'react-router-dom'
import'./main.css'
import UserConetxt from './context/userConetxt.jsx'
import CartContext from './context/CartContext.jsx'
import Wishlist from './context/Wishlist.jsx'


createRoot(document.getElementById('root')).render(
<StrictMode>
  <UserConetxt>
    <CartContext>
      <Wishlist>
    <BrowserRouter basename='/e-commerce'>
      <App />
    </BrowserRouter>
       </Wishlist>
    </CartContext>
  </UserConetxt>
</StrictMode>
)
