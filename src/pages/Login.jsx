import React, { useContext, useState } from 'react'
import { globelcontext } from '../context/userConetxt'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



function Login() {

const {login}=useContext(globelcontext)
const [email,setemail]=useState("")
const [password,setpass]=useState("")
const navigat=useNavigate()
const[erroor,seterror]=useState(false)
const changemail=(event)=>{
    setemail(event.target.value.trim())
}
const chhangepass=(event)=>{
    setpass(event.target.value.trim())
}

const handlesubmit= async (eve)=>{
eve.preventDefault()
if(!email || !password){
    seterror(true)
}

try{ const {data:ismatch}= await axios.get(`http://localhost:5000/users`,{
    params:{
        email:email,
        password:password
    }
})||[]
console.log(ismatch);

if(email&& password&& ismatch.length>0){ login({email,password,name:ismatch[0].name}); seterror(false);navigat('/',{replace:true}) ; setname("");
    setpass("")}else{
    seterror(true)
    setname("")
    setpass("")

}} 
catch(err){
seterror(true)
}

}

  return (
    <div>
        <h2>LogIn Here</h2>
            <div>
                <form action="" onSubmit={handlesubmit}>

                    <label>Email</label>
                    <input type="text" name='email' value={email} onChange={changemail} required/>
                    <label>Password</label>
                    <input type="password" name='password' value={password} onChange={chhangepass} required/>
                    <button type='submit'>logIn</button>
                    {erroor && <p style={{color:"red"}}>incorrect password or email</p>}

                </form>
            </div>
     <button onClick={()=>navigat('/register')}>Register</button>

    </div>
  )
}

export default Login