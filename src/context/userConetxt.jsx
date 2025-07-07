import React, { createContext, useEffect, useState } from 'react'

export const globelcontext=createContext()

function UserConetxt({children}) {
const [user,setuser]=useState(null)
const[loading,setload]=useState(true)

useEffect(()=>{
    const islogged=localStorage.getItem('currentuser')
    if(islogged){setuser(JSON.parse(islogged))}
    setload(false)
},[])

const login=(userdata)=>{
localStorage.setItem('currentuser',JSON.stringify(userdata))
setuser(userdata)
}
const logout=()=>{
    localStorage.removeItem('currentuser')
    setuser(null)
    
}



  return (
    
    <globelcontext.Provider value={{user,login,logout,loading}}>
        {children}
    </globelcontext.Provider>
  )
}

export default UserConetxt