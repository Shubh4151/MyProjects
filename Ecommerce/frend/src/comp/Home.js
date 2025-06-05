import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Ct from './Ct'
import {useNavigate} from 'react-router-dom'
const Home = () => {
    let [prod,setProd]=useState([])
    let obj=useContext(Ct)
    let navigate=useNavigate()
    let [f,setF]=useState(false)
    useEffect(()=>{
        axios.get("http://localhost:5000/prod").then((res)=>{
            setProd(res.data)
        })
    },[])
    let addcart=(pobj)=>{
      if(obj.state.token=="")
      {
        navigate("/login")
      }
      else{
       axios.post("http://localhost:5000/addcart",{"uid":obj.state.uid,"pid":pobj._id,"name":pobj.name,"price":pobj.price,"pimg":pobj.pimg,"qty":1}).then((res)=>{
          setF(true)
        })
        
      }

    }
  return (
    <div className='con'>
     {f&& <div className='alert'><p>Product Added to Cart</p>
      <button onClick={()=>setF(false)}>X</button>
      </div>}

      <h1 className='container-fluied text-primary text-center'>Products</h1>
    <div className='cardcon'>        
        {
            prod.map((pobj)=>{
                return(
                    <div class="card">
  <img src={`http://localhost:5000/imgs/${pobj.pimg}`} class="card-img-top" alt="prodimg"/>
    <h5 class="card-title">{pobj.name}</h5>
    <h5 class="card-title">{pobj.price}</h5>
    <p class="card-text">{pobj.desc}</p>
    <button class="btn btn-primary" onClick={()=>addcart(pobj)}>AddtoCart</button>
    <button onClick={()=>navigate(`/km/${pobj._id}`)}>KnowMore</button>
</div>
                )
            })
        }
    </div>
    </div>
  )
}

export default Home