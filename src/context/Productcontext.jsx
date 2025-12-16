import React, { createContext, createRef, useState } from 'react'
export const searchcontext=createContext()

function Productcontext({children}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  return (
    <searchcontext.Provider
      value={{ search, setSearch, sort, setSort}}
    >
      {children}
    </searchcontext.Provider>
  );
}

export default Productcontext