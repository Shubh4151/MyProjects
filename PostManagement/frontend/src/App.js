import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Nav from './Comp/Nav'
import Home from './Comp/Home'
import Login from './Comp/Login'
import Reg from './Comp/Reg'
import Add from './Comp/Add'
import Edit from './Comp/Edit'
import Logout from './Comp/Logout'
import './App.css'
import All from './Comp/All'
import News from './Comp/News'
import Sports from './Comp/Sports'
import Other from './Comp/Other'
import Pdm from './Comp/Pdm'
import { useEffect, useState } from 'react'
import Ct from './Comp/Ct'
import Cookies from 'js-cookie'
import Admin from './Comp/Admin'

const App = () => {
  let [state,setState]=useState({"token":"","uid":"","name":"","role":""})
  
  let updstate=(obj)=>{
    setState({...state,...obj})
  }
  useEffect(()=>{
    let t=Cookies.get("lgc")
    if(t!=undefined)
    {
      updstate(JSON.parse(t))
    }

  },[])
  let obj={"state":state,"updstate":updstate}
  
  return (
    <BrowserRouter>
    <Ct.Provider value={obj}>
    <Nav/>
    <Routes>
      <Route path="/" element={<Home/>}>
      <Route path='/' element={<All/>}/>
      <Route path="/news" element={<News/>}/>
      <Route path="/sp" element={<Sports/>}/>
      <Route path="/other" element={<Other/>}/>
      <Route path="/pdm" element={<Pdm/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/reg" element={<Reg/>}/>
      <Route path="/add" element={<Add/>}/>
      <Route path="/edit" element={<Edit/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path='/admin' element={<Admin/>}/>

    </Routes>
    </Ct.Provider>
    </BrowserRouter>
  )
}

export default App