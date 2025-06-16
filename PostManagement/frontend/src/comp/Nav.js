import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Ct from './Ct'

const Nav = () => {
  let obj=useContext(Ct)
  return (
   <nav>
    <Link to="/">Home</Link>
   {obj.state.token==""&& <Link to="/login">Login</Link>}
   {obj.state.token==""&&<Link to="/reg">Register</Link>}
   {obj.state.token!=""&& <Link to="/addpost">AddPost</Link>}
    {obj.state.token!=""&&obj.state.role=="admin"&& <Link to="/admin">Admin</Link>}
    {obj.state.token!=""&& <Link to="/logout">Logout</Link>}
    {obj.state.token!=""&&<a>{obj.state.name}</a>}
   </nav>
  )
}

export default Nav