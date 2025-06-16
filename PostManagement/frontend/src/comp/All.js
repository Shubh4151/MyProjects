import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const All = () => {
    let [data,setData]=useState([])
    let [f,setF]=useState(true)
    let navigate=useNavigate()
    useEffect(()=>{
axios.get("http://localhost:5000/all").then((res)=>{
    setData(res.data)
})
    },[f])
let like=(pid)=>{
    let t=Cookies.get("lgc")
    if(t)
    {
        t=JSON.parse(t)
        axios.put("http://localhost:5000/like",{"pid":pid,"uid":t.uid}).then((res)=>{
            setF(!f)
        })

    }
    else{
        navigate("/login")
    }
}

let dlike=(pid)=>{
    let t=Cookies.get("lgc")
    if(t)
    {
        t=JSON.parse(t)
        axios.put("http://localhost:5000/dlike",{"pid":pid,"uid":t.uid}).then((res)=>{
            setF(!f)
        })

    }
    else{
        navigate("/login")
    }
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
                    </div>
                    <div>
                        <button onClick={()=>like(post._id)}>Like {post.likes.length}</button>
                        <button onClick={()=>dlike(post._id)}>Dislike {post.dlikes.length}</button>
                
                    </div>

                </div>)
            })
        }

    </div>
  )
}

export default All