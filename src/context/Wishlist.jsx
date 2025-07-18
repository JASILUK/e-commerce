import React, { createContext, useContext, useEffect, useState } from 'react'
import { globelcontext } from './userConetxt'
import axios from 'axios'
import Usecustom from '../customehook/Usecustom'

export const wishcontext=createContext()
function Wishlist({children}) {
const[wishlistdata,setwishlist]=useState([])
const [wishId,setwishId]=useState(null)
const {user} =useContext(globelcontext)

const {data :iswished}=  Usecustom( user?.id?`http://localhost:5000/wishlist?UserId=${user.id}`:null)

useEffect(()=>{
    if(!user){
        setwishlist([])
        setwishId(null)
    }
},[user])

useEffect(()=>{
    const setwish=async ()=>{
        try{
             if(user && iswished){
            if(iswished.length>0){
                setwishlist(Array.isArray(iswished[0]?.wishitem)?iswished[0].wishitem :[])
                setwishId(iswished[0].id)
            }else{
               const res= await axios.post(`http://localhost:5000/wishlist`,{
                   UserId:user.id ,
                   wishitem:[]
                })
                setwishlist([])
                setwishId(res.data.id)
            }
        }

        }catch(err){
            console.log(err.message)
        }
       
    }

    setwish()
},[user,iswished])

const updatewish= async(wishproduct)=>{
   setwishlist(wishproduct)
   if(wishId){
       await  axios.patch(`http://localhost:5000/wishlist/${wishId}`,{wishitem:wishproduct})
   }
}
const addtowish=async (item)=>{
    const list=Array.isArray(wishlistdata)?wishlistdata:[]
    const isexist=list?.find((a)=>a.id==item.id)
    let newdata
    if(isexist){
        newdata=list.filter((a)=>a.id!=item.id)
    }else{
        newdata=[...list,item]
    }
    updatewish(newdata)
} 



  return (
   <wishcontext.Provider value={{wishlistdata,addtowish,wishId}}>
    {children}
   </wishcontext.Provider>
  )
}

export default Wishlist