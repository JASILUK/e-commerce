import { API } from "./axios";


export const getCategories = () => API.get("products/v1/categories/");
export const getProducts = (params) => API.get("products/v1/products/", { params });
export const getproductDetailed = (slug) => API.get(`products/v1/products/${slug}/`)


export const getAllColorsAPI = (slug) => API.get(`products/v1/seller/products/${slug}/color/`);
export const addProductColorAPI = (slug, data) => API.post(`products/v1/seller/products/${slug}/color/`, data);

export const createSellerProductAPI = (payload) => API.post("products/v1/seller/products/",payload)
export const getSellerProductDetailAPI = (slug) => API.get(`products/v1/seller/products/${slug}/`)
export const deletSellerProduct = (slug) => API.delete(`products/v1/seller/products/${slug}/`)

export const toggleProductStatusAPI  = (slug,is_active) => API.patch(`products/v1/seller/products/${slug}/`,{is_active:is_active})
export const updateSellerProductAPI  = (slug,payload) => API.patch(`products/v1/seller/products/${slug}/`,payload)
export const getEditProductAPI = (slug) => API.get(`products/v1/seller/products/${slug}/edit/`)



export const addGenaralImageAPI =(slug,data) => API.post(`products/v1/seller/products/${slug}/general/images/`,data)
export const DeleteGenaralImageAPI =(slug,id) => API.delete(`products/v1/seller/products/${slug}/general/images/${id}/`)
export const editGenaralImageAPI =(slug,id,data) => API.put(`products/v1/seller/products/${slug}/general/images/${id}/`,data)

