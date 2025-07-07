import React, { createContext, useContext, useEffect, useState } from 'react'
import { globelcontext } from './userConetxt'
export const Crtcontext=createContext()

function CartContext({children}) {
const[cartdata,setcart]=useState([])
const {user}=useContext(globelcontext)
  const [UserId, setUserId] = useState(null)

  useEffect(() => {
    if (user?.email) {
      setUserId(user.email)
    } else {
      setUserId(null)
      setcart([])
    }
  }, [user])

useEffect(()=>{
    if(UserId){
     const iscarted=   localStorage.getItem(`user${UserId}`)
      setcart(iscarted ? JSON.parse(iscarted) : [])
 
      
    }else{
        setcart([])
    }
},[UserId])

useEffect(()=>{
    if(UserId){
        localStorage.setItem(`user${UserId}`,JSON.stringify(cartdata))
    }
},[UserId,cartdata])

const addtocart=(productitem)=>{

    if(!UserId){return}
    if(UserId){
        const iscarted=cartdata.find(item=>item.id==productitem.id)
        if(iscarted){
            setcart(pre=>pre.map(item=>item.id==productitem.id?{...item,quantity:item.quantity+1}:item))
        }else{
            setcart(pre=>[...pre,{...productitem,quantity:1}])
        }
    }
}

const removeitem=(product)=>{
    setcart(pre=>pre.filter(item=>item.id!=product.id))
}
const clearcart=()=>{
    setcart([])
    if(UserId){
        localStorage.removeItem(`user${UserId}`)
    }
}
const increasqty=(obj)=>{
  setcart(pre=>pre.map(item=>item.id==obj.id?{...item,quantity:item.quantity+1}:item))
}
const dicreasqty=(obj)=>{
  setcart(pre=>pre.map(item=>item.id==obj.id?item.quantity>1?{...item,quantity:item.quantity-1}:
    item:item))
}


  return (
    <Crtcontext.Provider value={{UserId,cartdata,addtocart,removeitem,clearcart,increasqty,dicreasqty}}>
        {children}
    </Crtcontext.Provider>

  )
  
}

export default CartContext