import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
const Admpage = () => {
    let [prod,setProd]=useState([])
    let [f,setF]=useState(true)
    let navigate=useNavigate()
useEffect(()=>{
    let x=Cookies.get("lc")
    if(x==undefined)
    {
        navigate("/login")
    }
    else{
        x=JSON.parse(x)
    axios.get(`http://localhost:5000/getbyrt/${x.uid}`).then((res)=>{
        setProd(res.data)
    })
    }

},[f])
let del=(pid)=>{
    axios.delete(`http://localhost:5000/del/${pid}`).then(()=>{
        setF(!f)
    })
}
let edit=(pobj)=>{
    Cookies.set("prod",JSON.stringify(pobj))
    navigate("/edit")

}

  return (
    <div>
         <div className='cardcon'>
        
        
        {
            prod.map((pobj)=>{
                return(
                    <div class="card">
  <img src={`http://localhost:5000/imgs/${pobj.pimg}`} class="card-img-top" alt="prodimg"/>
    <h5 class="card-title">{pobj.name}</h5>
    <h5 class="card-title">{pobj.price}</h5>
    <p class="card-text">{pobj.desc}</p>
    <button onClick={()=>navigate(`/km/${pobj._id}`)}>KnowMore</button>
    <button onClick={()=>edit(pobj)}>Edit</button>
    <button onClick={()=>del(pobj._id)}>Delete</button>
</div>

                )
            })
        }
    </div>
    </div>
  )
}

export default Admpage