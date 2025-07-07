import axios from 'axios'
import React, {  useMemo, useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom'

function Register() {
  const [formdata,setForm]=useState({
    name:"",
    email:"",
    password:"",
    confirm:"",
    role:"user"
  })
 const[error,seterror]=useState("")

const navigate=useNavigate()
 const changevalue=(event)=>{
    setForm(pre=>{return{...pre,[event.target.name]:event.target.value.trim()}})
  }

const handleReg= async (eve)=>{
eve.preventDefault()

  if(!formdata.name || !formdata.email || !formdata.password || !formdata.confirm){
  return  seterror('pleas fill inputs')
  }
  if(formdata.password!==formdata.confirm){
   return seterror('incorrect password')
  }
  try {
    const {data}= await axios.get('http://localhost:5000/users',{
      params:{
        email:formdata.email
      }
    })
   
    if(data.length>0){
     return seterror('Already existed')
      
    }

    axios.post("http://localhost:5000/users",{
    name:formdata.name,
    email:formdata.email,
    password:formdata.password,
    role:"user"
    })
    navigate('/login',{replace:true})
    seterror('')

  }catch(err){
    console.error(err)
  }
}

  return (
    <div>
      <div> <h1> Register</h1>
        <form action="" onSubmit={handleReg}>
          <label>Name</label>
          <input type="text" name='name' onChange={changevalue} value={formdata.name}  />
          <label>Email</label>
          <input type="email" name='email' onChange={changevalue} value={formdata.email}/>
          <label>password</label>
          <input type="password" name='password' value={formdata.password} onChange={changevalue} />
          <label>Confirm Password</label>

          <input type="password" name='confirm' value={formdata.confirm} onChange={changevalue} />
          <button type='submit'>Register</button>
          {error && <p>{error}</p>}

        </form>
        <Link to='/login'>Already have an account ?</Link>
      </div>
      
      
    
    </div>
  )
}

export default Register