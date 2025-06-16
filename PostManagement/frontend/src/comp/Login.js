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

    let log=()=>{
      axios.post("http://localhost:5000/login",data).then((res)=>{
        if(res.data.token!=undefined)
        {
          Cookies.set("lgc",JSON.stringify(res.data),{"expires":2})
          obj.updstate(res.data)
          navigate("/")
        }
        else{
          setMsg(res.data.msg)
        }
      })
    }

  return (
    <div className='logcon'>
      <div>{msg}</div>
      <div className='login'>
        <input type='text' name='_id' placeholder='Enter Email' onChange={fun} value={data._id}/>
        <input type='password' name='pwd' placeholder='Enter Password' onChange={fun} value={data.pwd} />
        <button onClick={log}>Login</button>
      </div>
    </div>
  )
}

export default Login