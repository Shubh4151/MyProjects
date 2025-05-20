import React, { useContext, useState,useEffect } from 'react'
import Ct from './Ct'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Edit = () => {
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    if(obj.store.token=="")
    {
      navigate("/login")
    }

  },[])
  let [data,setData]=useState({"dob":"",...obj.store.std})
  
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})

  }
  let upd=()=>{
    axios.put("http://localhost:5000/upd",data,{"headers":{"Authorization":obj.store.token}}).then((res)=>{
      navigate("/disp")
    })

  }

  return (
    <div className='fcon'>
      <div className='form'>
        <input type='text' value={data._id} readOnly/>
        <input type='text' placeholder='Enter Name' value={data.name} name="name" onChange={fun}/>
        <input type='text' placeholder='Enter E-mail' value={data.email} name="email" onChange={fun}/>
        <input type='text' placeholder='Enter phno' value={data.phno} name="phno" onChange={fun}/>
        <input type='date' value={data.dob.slice(0,10)} name="dob" onChange={fun}/>
        <div> 
          <input type='radio' value="male" onChange={fun} name="gen" checked={data.gen=="male"}/>Male
          <input type='radio' value="female" onChange={fun} name="gen" checked={data.gen=="female"}/>Female
        
        </div>
        <input type='text' placeholder='Enter t' value={data.tel} name="tel" onChange={fun}/>
        <input type='text' placeholder='Enter h' value={data.hn} name="hn" onChange={fun}/>
        <input type='text' placeholder='Enter E' value={data.eg} name="eg" onChange={fun}/>
        <input type='text' placeholder='Enter m' value={data.m} name="m" onChange={fun}/>
        <input type='text' placeholder='Enter s' value={data.s} name="s" onChange={fun}/>
        <input type='text' placeholder='Enter sc' value={data.sc} name="sc" onChange={fun}/>
        <button onClick={upd}>Update</button>

      </div>
    </div>
  )
}

export default Edit