import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'
const Add = () => {
  let [data,setData]=useState({"title":"","desc":"","cat":""})
  let [msg,setMsg]=useState("")
  let [ck,setCk]=useState({"uid":"","name":""})
  let navigate=useNavigate()
  useEffect(()=>{
    let t=Cookies.get("lgc")
    if(t!=undefined)
    {
setCk({...JSON.parse(t)})
    }
    else{
      navigate("/login")
    }

  },[])

  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  let add=()=>{
    axios.post("http://localhost:5000/addpost",{...data,"uid":ck.uid,"name":ck.name}).then((res)=>{
      setMsg(res.data.msg)
    })

  }
  return (
    <div className='postcon'>
      <div className="post">
        <div>{msg}</div>
        <input type="text" placeholder="Enter Title" name="title" onChange={fun} value={data.title}/>
        <input type="text" placeholder="Enter Description" name="desc" onChange={fun} value={data.desc}/>
        <select onChange={fun} name='cat' value={data.cat}>
          <option value="" selected disabled>Select Category</option>
          <option value='news' >News</option>
          <option value='sports'>Sports</option>
          <option value='other'>Other</option>
        </select>
        <button onClick={add}>Post</button>
      </div>
    </div>
  )
}

export default Add