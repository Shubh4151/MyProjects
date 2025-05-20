import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  let [data,setData]=useState([])
    let [f,setF]=useState(true)
    let [ctotal,setCtotal]=useState(0)
let obj=useContext(Ct)
let navigate=useNavigate()
 
  useEffect(()=>{
    let x=Cookies.get("lc")
   
        if(x!=undefined)
        {
           x=JSON.parse(x)
          obj.stateupd(x)
      
      
    
axios.get(`http://localhost:5000/getcart/${x.uid}`).then((res)=>{
  let t=0
  for(let cobj of res.data)
  {
    t=t+cobj.qty*cobj.price
  }
  setCtotal(t)
  setData(res.data)
})
  }
        else{
          navigate("/login")
        }
  },[f])
  let delcart=(cid)=>{
    axios.get(`http://localhost:5000/del/${cid}`).then(()=>{
      setF(!f)
    })

  }
  let incqty=(cid)=>{
    axios.get(`http://localhost:5000/inc/${cid}`).then(()=>{
      setF(!f)
    })
  }
    let decqty=(cid,qty)=>{
      if(qty>1)
      {
    axios.get(`http://localhost:5000/dec/${cid}`).then(()=>{
      setF(!f)
    })
  }
  else{
    delcart(cid)
  }
  }
  return (
    <div className='cardcon'>
      { data.map((pobj)=>{
                return(
                    <div class="card">
  <img src={`http://localhost:5000/imgs/${pobj.pimg}`} class="card-img-top" alt="prodimg"/>
    <h5 class="card-title">{pobj.name}</h5>
    <h5 class="card-title">{pobj.price}</h5>
    <p class="card-text"><button onClick={()=>decqty(pobj._id,pobj.qty)}>-</button>{pobj.qty}<button onClick={()=>incqty(pobj._id)}>+</button></p>
    <p>Total:{pobj.qty*pobj.price}</p>
    <button class="btn btn-primary" onClick={()=>delcart(pobj._id)} >delcart</button>
</div>
                )
            })
        }
     { data.length>0&&  <div>{ctotal}</div>} 
        { data.length==0&&  <div>Your Cart was empty</div>}     
    </div>
  )
}

export default Cart