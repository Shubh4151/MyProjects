import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Nav from "./component/Nav"
import Home from "./component/Home"
import Login from './component/Login'
import Logout from './component/Logout'
import Disp from './component/Disp'
import Reg from './component/Reg'
import Edit from './component/Edit'
import Hal from './component/Hal'
import Ct from './component/Ct'
import { useState } from 'react'
import './App.css'

const App = () => {
  let [store,setStore]=useState({"token":"","name":""})
  let updstore=(obj)=>{
    setStore({...store,...obj})
  }
  let obj={"store":store,"updstore":updstore}
  return (
    <BrowserRouter>
    <Ct.Provider value={obj}>
    <Nav/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path="/disp" element={<Disp/>}/>
      <Route path='/reg' element={<Reg/>}/>
      <Route path='/edit' element={<Edit/>}/>
      <Route path="/hal" element={<Hal/>}/>
    </Routes>
    </Ct.Provider>
    </BrowserRouter>
  )
}

export default App