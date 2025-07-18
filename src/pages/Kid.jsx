import React, { useContext } from 'react'
import Usecustom from '../customehook/Usecustom';
import ProductCard from '../components/productCard';
import { searchcontext } from '../context/Productcontext';

function Kid() {
  const { data: products } = Usecustom('http://localhost:5000/products?category=kids');
  const {searchtext,filter}=useContext(searchcontext)
  const filetered=products?.filter((a)=> a.title?.toLowerCase().includes(searchtext?.toLowerCase() ||'') && a.status=='active' )
  const sorted= filetered?.sort((a,b)=>{
    if(filter=='low'){
      return a.price-b.price
    }
    if(filter=='high'){
      return b.price-a.price
    } }) 
  return (
    <div style={{ backgroundColor: '#f3f4f6' }}>
      <div style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "10px"
      }}>
        {(sorted) ? sorted?.map(item => <ProductCard key={item.id} value={item} />)
          : <p> Empty Product ! </p>}
      </div>
    </div>
  )
}

export default Kid;
