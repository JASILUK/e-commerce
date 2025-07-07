import React from 'react'
import Usecustom from '../customehook/Usecustom'
import ProductCard from '../components/productCard'
import Navabar from '../components/navabar'

function Collection() {
  const {products}=Usecustom('http://localhost:5000/products')
  
  return (
    <div style={{backgroundColor:' #f3f4f6	'}}>
      <Navabar/>
      
      <div  style={{
      display:"flex",
      flexDirection:"row",
      flexWrap:"wrap",
      justifyContent:"center",
      marginTop:"10px"
    }} >
        {(products)?products.map(item=><ProductCard key={item.id} value={item}/>)
        :<p> Empty Product !  </p>}
      </div>
    </div>
  )
}

export default Collection