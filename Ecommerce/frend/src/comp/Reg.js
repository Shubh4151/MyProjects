import axios from 'axios'
import  { useState } from 'react'

const Reg = () => {

   let [data,setData]=useState({"_id":"","name":"","pwd":"","role":""})
  let [msg,setMsg]=useState("")
  
    let fun=(e)=>{
      setData({...data,[e.target.name]:e.target.value})
  
    }
  
    let reg=()=>{
      axios.post("http://localhost:5000/reg",data).then((res)=>{
        setMsg(res.data.msg)
        setData({"_id":"","name":"","pwd":"","role":""})
      })
  
    }
  return (
    <div className='regcon'>
      <div className='reg'>
        <div className='err'>{msg}</div>
        <input type='text' placeholder='enter email' value={data._id} onChange={fun} name="_id"/>
        <input type='text' placeholder='enter name' value={data.name} onChange={fun} name="name"/>
        <input type='password' placeholder='enter password' value={data.pwd} onChange={fun} name='pwd'/>
        <div style={{ display: 'flex', gap: '5px' }}>
          <input type='radio' value="user" onChange={fun} name="role" checked={data.role==="user"}/>User
          <input type='radio' value="retailer" onChange={fun} name="role" checked={data.role==="retailer"}/>Retailer
        </div>
        <button onClick={reg}>Register</button>
      </div>
    </div>
  )
}

export default Reg