import { API } from "./axios";

export const addToCartAPI = (data)=> API.post("cart/v1/add/item/",data)
export const getCartItemsAPI = ()=> API.get("cart/v1/get/cart/")
export const  updateCartItemAPI = (data) => API.patch("cart/v1/update/item/",data)
export const removecartItemAPI = (variant_id) => API.delete(`cart/v1/cart/remove/${variant_id}/`)
export const cleareCartAPI = ()=> API.delete("cart/v1/cart/clear/")
