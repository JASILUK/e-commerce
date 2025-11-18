import axios from "axios";
import { getCookie } from "../utils/getcookie";

export  const API = axios.create({
    baseURL :'http://localhost:8000/api',
    withCredentials :true
})  

API.interceptors.request.use((config)=>{
    config.headers['X-Client-Type'] = 'web';
    const csrftoken = getCookie('csrftoken')
    if (csrftoken){
        config.headers['X-CSRFToken'] = csrftoken
    }
    return config
})


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, result = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(result);
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);
    if (error.config.url.includes("/login/")) {
    return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => API(originalRequest))
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        
        await API.post('users/token/refresh/');

        processQueue(null, true);
        return API(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);