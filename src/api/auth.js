    import { API } from "./axios";

    export const registerAPI = (data)=> API.post('users/v1/auth/registration/',data) 
    export const loginAPI = (data) => API.post('users/v1/login/',data)
    export const logoutAPI = () => API.post('users/v1/logout/',{})
    export  const getuser = ()=> API.get('users/v1/me/')
    export const resendEmail = () => API.post('users/v1/auth/registration/resend-email/')
    export const googleLogeAPI = (data)=> API.post('users/v1/auth/google/',data)


    export const getMySellerApplication = () => API.get('users/v1/seller/application/');
    export const createSellerApplication = (data) => API.post('users/v1/seller/application/', data);
    export const updateSellerApplication = (id, data) => API.patch(`users/v1/seller/application/`, data); 
    export const deleteSellerApplication = () => API.delete(`users/v1/seller/application/`);

    export const adminListApplications = () => API.get('users/v1/admin/seller-application/');
    export const adminUpdateApplication = (id, data) => API.patch(`users/v1/admin/seller-application/${id}/`, data);