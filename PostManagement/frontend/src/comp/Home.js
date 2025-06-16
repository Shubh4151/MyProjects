import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Ct from './Ct'

const Home = () => {
  let obj=useContext(Ct)
  return (
    <div className='home'>
        <div className='sdmenu'>
            <Link to="/">All</Link>
            <Link to="/news">News</Link>
            <Link to="/sp">Sports</Link>
            <Link to="/other">Other</Link>
          {obj.state.token!=""&& <Link to="/pdm">PDM</Link>}


        </div>
        <div className='content'>
           
            <Outlet/>
           

        </div>
    </div>
  )
}

export default Home