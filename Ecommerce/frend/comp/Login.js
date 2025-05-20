import axios from 'axios'
import React, { useContext, useState } from 'react'
import Ct from './Ct'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = () => {
  let [data,setData]=useState({"_id":"","pwd":""})
let [msg,setMsg]=useState("")
let navigate=useNavigate()
let obj=useContext(Ct)

  let fun=(e)=>{
  setData({...data,[e.target.name]:e.target.value})
  }

  let login=()=>{
    axios.post("http://localhost:5000/login",data).then((res)=>{
      if(res.data.token!=undefined)
      {
        Cookies.set("lc",JSON.stringify(res.data),{"expires":2})
        obj.stateupd(res.data)
        navigate("/")
      }
      else{
        setMsg(res.data.msg)
      }
    })

  }
  return (
    <div className='logincon'>
      <div className='login'>
        <div className='err'>{msg}</div>
        <input type='text' placeholder='enter email' value={data._id} onChange={fun} name="_id"/>
        <input type='password' placeholder='enter password' value={data.pwd} onChange={fun} name='pwd'/>
        <button onClick={login}>Login</button>
        <Link to="/resetpwd">Forgotpassword</Link>
      </div>
    </div>
  )
}

export default Login