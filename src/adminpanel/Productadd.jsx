import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { data, replace, useNavigate, useParams } from 'react-router-dom';

function Productadd() {
  const [form, setForm] = useState({
    title: '',
    category: '',
    price: '',
    sizes: [],
    colors: [],
    imageUrl: '',
    description: '',
    stock: '',
    tags: [],
    discount: '',
    isFeatured: true,
    createdAt: '',
  });
const navigate=useNavigate()
const {ID}=useParams()

useEffect(()=>{
  if(ID){
    axios.get(`http://localhost:5000/products/${ID}`).then((res)=>{
      setForm(res.data)
    }).catch((er)=>{console.log(er);
    }) 
  }
},[ID])
  const handleChange = (e) => {
    const { name, value,  checked } = e.target;

    if (name === 'sizes') {
      if (checked) {
        setForm((prev) => ({
          ...prev,
          sizes: [...prev.sizes, value],
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          sizes: prev.sizes.filter((s) => s !== value),
        }));
      }
    }
    else if (name === 'colors') {
      setForm((prev) => ({
        ...prev,
        colors: value.trim().split(','),
      }));
    }
    else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleimageurl=async (eve)=>{
    const imagefile=eve.target.files[0]
    const formfile=new FormData()
    formfile.append('file',imagefile);
    formfile.append('upload_preset','react_uploads')
    try{
       const urldata= await axios.post('https://api.cloudinary.com/v1_1/db2hnirwi/image/upload',formfile)
       if(urldata){
        setForm((pre)=>({...pre,imageUrl:urldata.data.secure_url}))
        alert('image uploaded successfully')
       }else{
        alert('image not upoloaded')
       }
    }catch(err){
      console.log(err.massege);
      
    }

   
  }
  const handleadd= async (eve)=>{
    eve.preventDefault()
    const updatedform={...form,createdAt:form.createdAt || new Date().toLocaleString()}

      if(!form.category || !form.colors || !form.price || !form.sizes || !form.stock || !form.description || !form.discount || !form.imageUrl){
    return alert('pleas fill data')
  }
  try{
    if(ID){
    await axios.put(`http://localhost:5000/products/${ID}`,updatedform)
   alert('updated successfully')
 navigate('/admin/product',{replace:true})
  }else{ await axios.post('http://localhost:5000/products',
      updatedform
    )
    alert('added successfully')
    navigate('/admin/product',{replace:true})
}}catch(err){
    console.log(err);
    
  }}
  
 return (
  <div className="container my-5">
    <div className="card p-4 shadow-sm">
      <h3 className="text-center mb-4">Add New Product</h3>


      <form onSubmit={handleadd}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="title" className="form-control" onChange={handleChange} placeholder='enter title' value={form.title}/>
        </div> 

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select name="category" className="form-select" onChange={handleChange} value={form.category}>
            <option value="">Select</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" name="price" value={form.price} className="form-control" onChange={handleChange} placeholder='₹ price'/>
        </div>

        <div className="mb-3">
          <label className="form-label">Sizes</label>
          <div className="d-flex gap-3 flex-wrap">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <div className="form-check" key={size}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="sizes"
                  value={size}
                  id={`size-${size}`}
                  checked={form.sizes.includes(size)}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={`size-${size}`}>
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Colors (comma-separated)</label>
          <input type="text" name="colors" className="form-control" onChange={handleChange} placeholder='eg:red,green' value={form.colors.join(',')}/>
        </div>

        <div className="mb-3">
          <label className="form-label">Image Upload</label>
          <input type="file" name="imageUrl" className="form-control" onChange={handleimageurl} accept='image/*'/>
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="preview"
              className="mt-2 rounded"
              width="100"
            />
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input type="text" name="description" className="form-control" onChange={handleChange} value={form.description}/>
        </div>

        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input type="number" name="stock" className="form-control" onChange={handleChange} value={form.stock} />
        </div>

        <div className="mb-3">
          <label className="form-label">Discount (%)</label>
          <input type="number" name="discount" className="form-control" onChange={handleChange} value={form.discount} />
        </div>

        <button type="submit" className="btn btn-primary w-100">Add Product</button>
      </form>
    </div>
  </div>
);

}

export default Productadd;
