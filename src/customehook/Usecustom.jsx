import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { data } from 'react-router-dom'

function Usecustom(url) {
const[products,setproducts]=useState(null)

useEffect(()=>{
  const usfetch= async ()=>{
    try{
  const {data:productdata}= await axios.get(url)
  if(productdata){
    setproducts(productdata)
  }
  }
catch(err){
console.error(err.message);

}}

usfetch()
 
},[url])
  return {products}
  
}

export default Usecustom