import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Updpwd = () => {
  let [data,setData]=useState({"pwd":"","otp":""})
  let {uid}=useParams()
  let navigate=useNavigate()
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let resetpwd=()=>{
    axios.post("http://localhost:5000/resetpwd",{...data,"uid":uid}).then(()=>{
      navigate("/login")
    })
  }
  return (
    <div>
      <input type='text' name="pwd" onChange={fun}/>
      <input type='text' name="otp" onChange={fun}/>
      <button onClick={resetpwd}>Reseped</button>
    </div>
  )
}

export default Updpwd