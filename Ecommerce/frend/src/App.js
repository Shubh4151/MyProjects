import Addprod from "./comp/Addprod"
import Cart from "./comp/Cart"
import Ct from "./comp/Ct"
import Home from "./comp/Home"
import Login from "./comp/Login"
import Logout from "./comp/Logout"
import Nav from "./comp/Nav"
import Reg from "./comp/Reg"
import Resetpwd from "./comp/Resetpwd"
import Updpwd from "./comp/Updpwd"
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css'
import { useEffect, useState } from "react"
import Cookies  from 'js-cookie'
import Km from "./comp/Km"
import Admpage from "./comp/Admpage"
import Edit from "./comp/Edit"

const App = () => {
  let [state,setSate]=useState({"token":"","uid":"","role":"","name":""})
let stateupd=(sobj)=>{
  setSate({...state,...sobj})
}
useEffect(()=>{
       let x=Cookies.get("lc")
        if(x!=undefined)
        {
          stateupd(JSON.parse(x))
        }
},[])
  let obj={"state":state,"stateupd":stateupd}
  return (
    <BrowserRouter>
    <Ct.Provider value={obj}>
    <Nav/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/reg" element={<Reg/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/addprod" element={<Addprod/>}/>
      <Route path="/resetpwd" element={<Resetpwd/>}/>
      <Route path="/updpwd/:uid" element={<Updpwd/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/km/:pid" element={<Km/>}/>
      <Route path="/adm" element={<Admpage/>}/>
      <Route path="/edit" element={<Edit/>}/>
    </Routes>
    </Ct.Provider>
    </BrowserRouter>
  )
}
export default App