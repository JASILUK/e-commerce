import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter}  from'react-router-dom'
import'./main.css'
import UserConetxt from './context/userConetxt.jsx'
import CartContext from './context/CartContext.jsx'
import Wishlist from './context/Wishlist.jsx'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


createRoot(document.getElementById('root')).render(
<StrictMode>
    <Elements stripe={stripePromise}>
  <UserConetxt>
    <CartContext>
      <Wishlist>
    <BrowserRouter >
      <App />
    </BrowserRouter>
       </Wishlist>
    </CartContext>
  </UserConetxt>
  </Elements>
</StrictMode>
)
