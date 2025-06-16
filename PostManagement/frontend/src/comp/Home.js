import React, { useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Ct from './Ct'
import Cookies from 'js-cookie'
const Home = () => {
  let obj=useContext(Ct)
  useEffect(()=>{
    let x=Cookies.get("con")
    if(x!=undefined)
    {
    obj.updstate(JSON.parse(x))
    }

  },[])
  return (
    <div className='hcon'>
    <div className='left'>
        <Link to="/">All</Link>
        <Link to="/bs">Business</Link>
        <Link to="/sp">Sports</Link>
        <Link to="/edu">Education</Link>
        <Link to="/news">News</Link>
       {obj.state.token!=""&& <Link to="/pdm">PDM</Link>}
    </div>
    <div className='right'>
   
        <Outlet/>
       
    </div>
    </div>
  )
}

export default Home