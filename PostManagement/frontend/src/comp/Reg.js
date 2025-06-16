import React, { useState } from 'react'
import axios from 'axios'
const Register = () => {

   let [data,setData]=useState({"_id":"","name":"","pwd":""})
    let [msg,setMsg]=useState("")
    
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  let reg=()=>{
    axios.post("http://localhost:5000/reg",data).then((res)=>{
      setMsg(res.data.msg)
    })

  }
  return (
    <div className="regcon">
      <div className="reg">
        <div className='err'>{msg}</div>
        <input type="text" name="_id" placeholder="Enter Email" onChange={fun} value={data._id}/>
        <input type="text" name="name" placeholder="Enter Name" onChange={fun} value={data.name}/>
        <input type="password" name="pwd" placeholder="Enter Password" onChange={fun} value={data.pwd}/>
        <button onClick={reg}>Register</button>
      </div>
    </div>
  )
}

export default Register