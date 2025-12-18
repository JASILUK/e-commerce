import { API } from "./axios";

export const CreateOrderAPI = (data) => 
  API.post("orders/v1/create/", data);

export const fetchMyOrders = () => API.get("orders/v1/myorders/");
export const fetchOrderDetail = (id) => API.get(`orders/v1/myorders/${id}/`);