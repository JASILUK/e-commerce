import React from 'react'
import Usecustom from '../customehook/Usecustom'
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
function Admindashboard() {
    const {data :users} =Usecustom("http://localhost:5000/users")
    const {data :products} =Usecustom("http://localhost:5000/products")
    const {data :orders} =Usecustom("http://localhost:5000/orders")
     const totalSales = orders?.reduce((acc, order) => {
   const orderTotal = order.products?.reduce((sum, p) =>
    sum + (p.price || 0) * (p.quantity || 0), 0)
        return acc + orderTotal
            }, 0) || 0

    const grapfuncion=(orderdata)=>{
        const months=[
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ]

        const monthly=Array(12).fill(0)
        
        if (Array.isArray(orders)) {
      
      for (let order of orders) {
        const date = new Date(order.orderedAt)
        const month = date.getMonth()

        let orderTotal = 0
        for (let item of order.products || []) {
          orderTotal += (item.price || 0) * (item.quantity || 0)
        }

        monthly[month] += orderTotal
      }
    }

    return months.map((month, index) => ({
      month,
      sale: monthly[index]
    }))
  }
        
    
    const monthlysales=grapfuncion(orders)
  return (
     <div className="admin-dashboard">
      <h2>Sales Overview</h2>
      <div>
        <div className="admin-graph">
            <h3>Monthly Sales Report</h3>
            <ResponsiveContainer width="100%" height={300} >
          <BarChart data={monthlysales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis  />
            <Tooltip />
            <Bar dataKey="sale" fill="#3c877cff" />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </div>
      <div className="admin-cards">
        
          

        <div className="admin-card">
          <h4>Total Users</h4>
          <p>{users?.length || 0}</p>
        </div>
        <div className="admin-card">
          <h4>Total Products</h4>
          <p>{products?.length || 0}</p>
        </div>
        <div className="admin-card">
          <h4>Total Orders</h4>
          <p>{orders?.length || 0}</p>
        </div>
        <div className="admin-card">
          <h4>Total Sales</h4>
          <p>₹ {
           totalSales
          }</p>
        </div>
      </div>
    </div>
  )
}

export default Admindashboard  

