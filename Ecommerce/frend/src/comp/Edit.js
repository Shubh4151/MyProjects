import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

const Edit = () => {
     let [data,setData]=useState({"_id":"","name":"","desc":"","cat":"","price":""})
    let [file,setFile]=useState("")
     let navigate=useNavigate()
    let [msg,setMsg]=useState("")
        let fun=(e)=>{
   setData({...data,[e.target.name]:e.target.value})
  
    }
    useEffect(()=>{
        let x=Cookies.get("prod")
        if(x==undefined)
        {
            navigate("/")
        }
        else{
            setData({...JSON.parse(x)})
        }

    },[])
    let upd=()=>{
        axios.put("http://localhost:5000/upd",data).then((res)=>{
            setMsg(res.data.msg)

        })

    }
    let fun1=(e)=>{
      setFile(e.target.files[0])
    }
    let updimg=()=>{
      let fd=new FormData()
      fd.append("_id",data._id)
      fd.append("pimg",file)
      axios.post("http://localhost:5000/updimg",fd).then((res)=>{
        setMsg(res.data.msg)

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

        <button onClick={upd}>Update</button>
      </div>
      <div>
        <input type='file' onChange={fun1}/>
        <button onClick={updimg}>Updateimg</button>
      </div>
    </div>
  )
}

export default Edit