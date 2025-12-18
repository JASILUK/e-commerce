import React, { createContext, useEffect, useState } from 'react'
import { API } from '../api/axios'
import { getuser, loginAPI, logoutAPI } from '../api/auth'
import { toast } from 'react-toastify'
import { authState } from '../api/authstate'

export const globelcontext=createContext()

function UserConetxt({children}) {
const [user,setuser]=useState(null)
const[loading,setload]=useState(true)

useEffect(()=>{
    checkuser()
},[])


const checkuser = async () => {
  setload(true);
  try {
    const res = await getuser();
    setuser(res.data);
  } catch {
    setuser(null);
  } finally {
    setload(false);
  }
};

const login = async (userdata,setdirectily) => {
  if (setdirectily){
    setuser(setdirectily.user)
    return { success: true, message: "Logged in successfully" };
  }
  try {
    const res = await loginAPI(userdata);
    await checkuser();

    return {
      success: true,
      message: res.data.detail,
    };

  } catch (error) {
    const msg = error.response?.data?.detail || "Login failed"
    return {
      success: false,
      message: msg,
    };
  }
};

const logout = async () => {
  try {
    
    authState.isLoggingOut = true;

    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
    setuser(null);
    await logoutAPI();
    toast.success("Logout successful");
    
  } catch (err) {
    toast.error(err.response?.data?.detail || "Logout failed");
  } finally {
      authState.isLoggingOut = false;
    setload(false);
  }
};
const resendEmail = async (email) => {
  try {
    await API.post("users/v1/auth/registration/resend-email/", { email });
    return true;
  } catch (error) {
    return false;
  }
};




  return (
    
    <globelcontext.Provider value={{user,login,logout,resendEmail,loading}}>
        {children}
    </globelcontext.Provider>
  )
}

export default UserConetxt