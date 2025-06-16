import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const Pdm = () => {
    let [data,setData]=useState([])
  let navigate=useNavigate()
  useEffect(()=>{
    let t=Cookies.get("lgc")
    if(t!=undefined)
    {
let cobj=JSON.parse(t)
      axios.get(`http://localhost:5000/pdm/${cobj.uid}`).then((res)=>{
    setData(res.data)
})

    }
    else{
      navigate("/login")
    }

  },[])

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

                </div>)
            })
        }

    </div>
  )
}

export default Pdm