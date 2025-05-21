import React, { useState } from 'react'
import axios from 'axios'
const Reg = () => {
  let [data,setData]=useState({"name":"","phno":"","email":"","gen":"","dob":"","photo":""})
  let [msg,setMsg]=useState("")
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let fun1=(e)=>{
    setData({...data,"photo":e.target.files[0]})
  }
  let reg=()=>{
    let fd=new FormData()
    for(let p in data)
    {
      fd.append(p,data[p])
    }
    axios.post("http://localhost:5000/reg",fd).then((res)=>{
      if("msg" in res.data)
      {
setMsg(res.data.msg)
setData({"name":"","phno":"","email":"","gen":"","dob":"","photo":""})
      }
      else{
        setMsg(res.data.err)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div className='fcon'>
      <div className='form'>
        {msg!=""&&<div className='err'>{msg}</div>}
        <input type='text' placeholder='Enter Name' value={data.name} name="name" onChange={fun}/>
        <input type='text' placeholder='Enter E-mail' value={data.email} name="email" onChange={fun}/>
        <input type='text' placeholder='Enter phno' value={data.phno} name="phno" onChange={fun}/>
        <input type='date' value={data.dob} name="dob" onChange={fun}/>
        <div> 
          <input type='radio' value="male" onChange={fun} name="gen" checked={data.gen=="male"}/>Male
          <input type='radio' value="female" onChange={fun} name="gen" checked={data.gen=="female"}/>Female
          <input type='file' onChange={fun1}/>
          <button onClick={reg}>Register</button>
        </div>

      </div>
    </div>
  )
}

export default Reg