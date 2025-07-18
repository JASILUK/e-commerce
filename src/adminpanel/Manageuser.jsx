import React, { useEffect, useState } from 'react'
import Usecustom from '../customehook/Usecustom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Manageuser() {
  const [users,setusers]=useState([])
  const navigat=useNavigate()
  
  
  useEffect(()=>{
    fetchData()
  },[])
  const fetchData= async()=>{
    try{
    const{data }=await axios.get(`http://localhost:5000/users`)
    const newuser=data?.filter((a)=>a.role!='admin')
    setusers(newuser)
    }catch(er){
      console.log((er));
      
    }
  
  }
  

  const toggleBlock= async(id,block)=>{
    try{
    await axios.patch(`http://localhost:5000/users/${id}`,{
        isblocked:!block
      })
      fetchData()
    }catch(err){
      console.log(err);
      
    }
  }

  const deleteUser= async(id)=>{
   if(window.confirm('are you sure?')){
    await axios.delete(`http://localhost:5000/users/${id}`)
    const cartdata=  await axios.get(`http://localhost:5000/carts?userId=${id}`)
    if(cartdata.data.length>0){
     const cartid= cartdata.data[0].id
    await axios.delete(`http://localhost:5000/carts/${cartid}`)
    }
    const wishdata= await axios.get(`http://localhost:5000/wishlist?UserId=${id}`)
    const wishid= wishdata.data?.[0].id
    await axios.delete(`http://localhost:5000/wishlist/${wishid}`)
    fetchData()
    }
  }
  return (
  <div className="container py-4">
    <h2 className="mb-4 text-center">👥 User Management</h2>

    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((u, index) => (
            <tr key={u.id}>
              <td>{index + 1}</td>
              <td
                style={{ cursor: 'pointer' }}
                className="text-primary fw-semibold"
                onClick={() => navigat(`/admin/users/${u.id}`)}
              >
                {u.name}
              </td>
              <td>{u.email}</td>
              <td>
                <span
                  className={`badge px-3 py-2 ${
                    u.isblocked ? 'bg-danger' : 'bg-success'
                  }`}
                >
                  {u.isblocked ? 'Blocked' : 'Active'}
                </span>
              </td>
              <td>
                <button
                  onClick={() => toggleBlock(u.id, u.isblocked)}
                  className={`btn btn-sm ${
                    u.isblocked ? 'btn-success' : 'btn-warning'
                  }`}
                >
                  {u.isblocked ? 'Unblock' : 'Block'}
                </button>

                <button
                  onClick={() => deleteUser(u.id)}
                  className="btn btn-sm btn-outline-danger ms-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}

export default Manageuser