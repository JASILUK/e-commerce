import { API } from "./axios";

export const registerAPI = (data)=> API.post('users/v1/auth/registration/',data) 
export const loginAPI = (data) => API.post('users/v1/login/',data)
export const logoutAPI = () => API.post('users/v1/logout/',{})
export  const getuser = ()=> API.get('users/v1/me/')
export const resendEmail = () => API.post('users/v1/auth/registration/resend-email/')
export const googleLogeAPI = (data)=> API.post('users/v1/auth/google/',data)
