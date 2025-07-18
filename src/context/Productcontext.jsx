import React, { createContext, createRef, useState } from 'react'
export const searchcontext=createContext()

function Productcontext({children}) {
 const [searchtext,setsearch]=useState('')
 const [filter,setfilter]=useState('')
  return (
    <searchcontext.Provider value={{searchtext,filter,setfilter,setsearch}}>
        {children}
    </searchcontext.Provider>
  )
}

export default Productcontext