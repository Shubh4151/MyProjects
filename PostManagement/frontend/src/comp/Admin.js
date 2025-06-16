import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const Admin = () => {
    let [data,setData]=useState([])
  let navigate=useNavigate()
  let [f,setF]=useState(true)
  let [st,setSt]=useState("")
  let ir=useRef()
  useEffect(()=>{
    let t=Cookies.get("lgc")
    if(t!=undefined)
    {

      axios.get("http://localhost:5000/admin").then((res)=>{
    setData(res.data)
})

    }
    else{
      navigate("/login")
    }

  },[f])
  let inspect=(pid)=>{
    axios.put("http://localhost:5000/inspect",{"pid":pid,"comm":ir.current.value}).then(()=>{
        setF(!f)
       ir.current.value=""
    })
  }
  
    let approve=(pid)=>{
    axios.get(`http://localhost:5000/approve/${pid}`).then(()=>{
        setF(!f)
    })
  }
  return (
    <div className='con'>
        {
            data.map((post)=>{
                return(<div className='card'>
                    <h2>{post.title}</h2>
                    <p>{post.desc}</p>
                    <div>
                        <p>{post.name}</p>
                        <p>{new Date(post.date).toLocaleDateString()}</p>
                        <p>{post.cat}</p>
                        {post.comm!=undefined&&<p>{post.comm}</p>}
                        <p>Status:{post.status}</p>
                    </div>
                 { post.status=="pending"&&  <div>
                        <input type='text' ref={ir} />
                        <button onClick={()=>inspect(post._id)}>Inspect</button>
                        <button onClick={()=>approve(post._id)}>Accept</button>
                    </div>}

                </div>)
            })
        }

    </div>
  )
}

export default Admin