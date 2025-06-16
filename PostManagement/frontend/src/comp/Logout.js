import React, { useContext, useEffect } from 'react'
import Cookies from "js-cookie"
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
obj.updstate({"_id":"","name":"","token":"","role":""})
Cookies.remove("con")
navigate("/")

  },[])
  return (
    <div>Logout</div>
  )
}

export default Logout