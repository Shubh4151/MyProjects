import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Ct from "./Ct"
const Addprod = () => {
  let [data,setData]=useState({"name":"","desc":"","cat":"","price":"","pimg":""})
    let [msg,setMsg]=useState("")
    let [uid,setUid]=useState("")
    let navigate=useNavigate()
    let obj=useContext(Ct)
    useEffect(()=>{
      let x=Cookies.get("lc")
      if(x!=undefined)
      {
x=JSON.parse(x)
setUid(x.uid)
      }
      else{
        navigate("/login")
      }
    },[])
  
    let fun=(e)=>{
   setData({...data,[e.target.name]:e.target.value})
  
    }

    let fun1=(e)=>{
  setData({...data,"pimg":e.target.files[0]})
    }
  
    let add=()=>{
      let fd=new FormData()
      for(let p in data)
      {
        fd.append(p,data[p])
      }
      fd.append("rid",uid)
  axios.post("http://localhost:5000/addprod",fd,{"headers":{"Authorization":obj.state.token,"uid":obj.state.uid}}).then((res)=>{
    if(res.data.err!=undefined)
    {
      setMsg(res.data.err)
    }
    else{
    setMsg(res.data.msg)
    }
  })
      }
  return (
    <div className='addprodcon'>
      <div className='addprod'>
        <div className='err'>{msg}</div>
        <input type='text' placeholder='enter name' value={data.name} onChange={fun} name="name"/>
        <input type='text' placeholder='enter description' value={data.desc} onChange={fun} name="desc"/>
        <input type='text' placeholder='enter category' value={data.cat} onChange={fun} name='cat'/>
        <input type='text' placeholder='enter price' value={data.price} onChange={fun} name='price'/>
        <div><input type='file' onChange={fun1} accept='.jpg,.jpeg,.png'/></div>
        <button onClick={add}>Addprod</button>
      </div>
    </div>
  )
}

export default Addprod