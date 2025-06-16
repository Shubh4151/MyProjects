import axios from 'axios'
import React, { useContext, useState } from 'react'
import Ct from './Ct'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  let [data,setData]=useState({"_id":"","pwd":""})
  let [msg,setMsg]=useState("")
  let obj=useContext(Ct)
  let navigate=useNavigate()
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let login=()=>{
    axios.post("http://localhost:5000/login",data).then((res)=>{
      if(res.data.token!=undefined)
      {
        obj.updstate(res.data)
       Cookies.set("con",JSON.stringify(res.data),{"expires":7})
        navigate("/")
      }
      else{
        setMsg(res.data.msg)
      }
    })
  }
  let reg=()=>{
    navigate("/reg")
  }
  return (
    <div className='form'>
      <div className='form-con'>
        <div className='form-lft'>
          <h1>Welcome</h1>
          <p>New here?</p><p>Create an account to join us.</p>
          <button className='btn' onClick={reg}>Register</button>
        </div>
        <div className='form-rgt'>
          <h1>Login Here</h1>
          <h4 className='msg'>{msg}</h4>
          <div className='input'>
            <input type='text' placeholder='Email' name='_id' onChange={fun} value={data._id}/>
            <input type='text' placeholder='Password' name='pwd' onChange={fun} value={data.pwd}/>
          </div>
          <button className='btn' onClick={login}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login