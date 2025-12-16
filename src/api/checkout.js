import { API } from "./axios";

// export const BuyNowApi = (variant_id,qty)=> API.post('orders/v1/checkout/',
//                         {'mode':'buy_now','variant_id':variant_id,'qty':qty})
                    
export const CheckoutAPI = (data)=> API.post('orders/v1/checkout/',data)

export const getAddressListAPI = ()=> API.get('users/v1/address/')
export const setDefaultAddressAPI = (id)=> API.patch(`users/v1/address/${id}/`,{'is_default':true})
export const addAddressAPI =(data)=> API.post('users/v1/address/',data)