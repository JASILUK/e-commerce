import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { data } from 'react-router-dom'

function Usecustom(url) {
const [data, setData] = useState(null)

useEffect(() => {
  if (!url) return

  const fetchData = async () => {
    try {
      const res = await axios.get(url)
      setData(res.data)
    } catch (err) {
      console.error("❌ Usecustom fetch error:", err.message)
    }
  }

  fetchData()
}, [url])

return { data } 
  
}

export default Usecustom