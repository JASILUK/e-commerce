import React, { useContext } from 'react'
import { wishcontext } from '../context/Wishlist'
import WishlistCard from '../components/Wishlistcard';

function Wishdetails() {
const{wishlistdata}=useContext(wishcontext)
console.log(wishlistdata);

  return (
    <div>
        {wishlistdata?.length>0?wishlistdata.map((a)=><WishlistCard key={a.id} value={a}/>):<p>wrong</p>}
    </div>
  )
}

export default Wishdetails