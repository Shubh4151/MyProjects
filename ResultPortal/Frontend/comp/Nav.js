import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Ct from './Ct'

const Nav = () => {
  let obj=useContext(Ct)
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/reg">Studentreg</Link>
        <Link to="/hal">Print HAL</Link>
     { obj.store.token==""&&<Link to="/login">AdminLogin</Link>}
     { obj.store.token!=""&&  <Link to="/disp">Disp</Link>}
     { obj.store.token!=""&&  <Link to="/logout">Logout</Link>}
     { obj.store.token!=""&& <div>{obj.store.name}</div>}
    </nav>
  )
}

export default Nav