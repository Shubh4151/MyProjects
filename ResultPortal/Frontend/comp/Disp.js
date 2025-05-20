import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
const Disp = () => {
  let [data,setData]=useState([])
  let [f,setF]=useState(true)
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    if(obj.store.token=="")
    {
      navigate("/login")
    }

  },[])
  useEffect(()=>{
axios.get("http://localhost:5000/getstd",{"headers":{"Authorization":obj.store.token}}).then((res)=>{
  setData(res.data)
})
  },[f])
  let upd=(edtobj)=>{
    obj.updstore(edtobj)
    navigate("/edit")

  }
  let del=(hno)=>{
    axios.delete(`http://localhost:5000/del/${hno}`,{"headers":{"Authorization":obj.store.token}}).then((res)=>{
      setF(!f)

    })
  }

  return (
    <div id='disp'>
      {data.length>0&&<table>
        <tr><th>SNo</th><th>HNO</th><th>Name</th><th>Phno</th><th>E-mail0</th><th>Gender</th><th>Telugu</th><th>Hindi</th><th>English</th>
        <th>Maths</th><th>Science</th><th>Scocial</th></tr>
        {
          data.map((std,ind)=>{
            return(<tr>
              <td>{ind+1}</td>
              <td>{std._id}</td>
              <td>{std.name}</td>
              <td>{std.phno}</td>
              <td>{std.email}</td>
              <td>{std.gen}</td>
              <td>{std.tel}</td>
              <td>{std.hn}</td>
              <td>{std.eg}</td>
              <td>{std.m}</td>
              <td>{std.s}</td>
              <td>{std.sc}</td>
              <td><button onClick={()=>upd({"std":std})}>Edit</button></td>
              <td><button onClick={()=>del(std._id)}>Delete</button></td>
            </tr>)

          })
        }
        </table>}
    </div>
  )
}

export default Disp