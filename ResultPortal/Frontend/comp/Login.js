import axios from 'axios'
import React, { useContext, useState } from 'react'
import Ct from './Ct'
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
        obj.updstore(res.data)
        navigate("/disp")

      }
      else{
        setMsg(res.data.msg)
      }
    })
  }
  return (
    <div>
      <div>{msg}</div>
      <input type='text' value={data._id} onChange={fun} name="_id"/>
      <input type='password' value={data.pwd} onChange={fun} name='pwd'/>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login