import { API } from "./axios";

export const getproducts = ()=> API.get('products/v1/seller/products/')

export const SellerOrdersAPI = (params)=> API.get('seller/v1/orders/',{params})
export const SellerOrderDetailAPI = (id)=> API.get(`seller/v1/orders/${id}`)


export const getSellerDashboard = async (period = "month") => {
  const res = await API.get(`/seller/v1/dashboard/?period=${period}`);
  return res.data;
};




