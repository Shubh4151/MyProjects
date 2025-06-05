import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Ct from './Ct'

const Nav = () => {
  let obj=useContext(Ct)
  return (
    <nav className="navbar bg-dark">
        <Link to="/">Home</Link>
       {obj.state.token===""&& <Link to="/reg">Register</Link>}
              {obj.state.token===""&&  <Link to="/login">Login</Link>}
             {obj.state.token!==""&&obj.state.role!=="user"&&<Link to="/addprod">AddProd</Link>}
               {obj.state.token!==""&& <Link to="/cart">Cart</Link>}
               {obj.state.token!==""&&obj.state.role==="retailer"&& <Link to="/adm">ProdAddedByme</Link>}
              {obj.state.token!==""&&  <Link to="/logout">Logout</Link>}
                     {obj.state.token!==""&&<h2>{obj.state.name}</h2>} 
    </nav>
  )
}

export default Nav