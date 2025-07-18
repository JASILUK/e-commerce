import React, { useEffect, useState } from 'react'
import Navabar from '../components/navabar'
import { NavLink, useNavigate } from 'react-router-dom'
import Usecustom from '../customehook/Usecustom'
import Productscardes from './Productscardes'
import './product.css'
import axios from 'axios'

function Productcollection() {
  const [selected,setselect]=useState('all')
  const[seletedproduct,setproducts]=useState([])

  const navigate=useNavigate()

  const fetchdata= async ()  =>{
    const url=   selected!='all'?  `http://localhost:5000/products?category=${selected}`:
      'http://localhost:5000/products'
    try{
      const products= await axios.get(url)
      setproducts(products.data)

    }catch(err){
      console.log(err);
      
    }
  }
  useEffect(()=>{
    fetchdata()
  },[selected])

  const handeedit=(id)=>{
    navigate(`/admin/product/add/${id}`)
  }
  const handleremove= async(id)=>{
    if(window.confirm('do you want delete')){
    try{
      await axios.delete(`http://localhost:5000/products/${id}`);
      alert('product deleted ')
      fetchdata()
    }catch(er){
    console.log(er);
    
    } 
    }
  }
  const handlestatus=async (product)=>{
    try{
      const newstatus=product.status=='active'?'suspended':'active'
      await axios.patch(`http://localhost:5000/products/${product.id}`,{status:newstatus})
      alert(`product ${newstatus=='active'?'actived':'suspended'} successfully`)
      fetchdata()
    }catch(err){
      console.log(err);
      
    }
  }
  return (
    <div>
      <div className='Pnavalink'>
        <button onClick={()=>{setselect('all')}} className={selected=='all'? 'Pnavactive' : ''}>all</button>
        <button  onClick={()=>{setselect('men')}} className={selected=='men'? 'Pnavactive' : ''}>men</button>
        <button onClick={()=>{setselect('women')}} className={selected=='women'? 'Pnavactive' : ''}>women</button>
        <button  onClick={()=>{setselect('kids')}} className={selected=='kids'? 'Pnavactive' : ''}>kids</button>
      </div>
      <div><p >Totel prodects <span style={{color:'green',fontWeight:'bold'}}>{seletedproduct?.length}</span></p></div>
      <div className='product-container'>
          {seletedproduct?.length>0 ?seletedproduct.map((item)=>(<Productscardes key={item.id} value={{item,handeedit,handleremove,handlestatus}}/>)):<p>loading</p>}
      </div>
    </div>
  )
}

export default Productcollection