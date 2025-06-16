import React, { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Nav from './comp/Nav'
import Home from './comp/Home'
import Login from './comp/Login'
import Reg from './comp/Reg'
import Add from './comp/Add'
import Admin from './comp/Admin'
import Logout from './comp/Logout'
import './App.css'
import All from './comp/All'
import Bs from './comp/Bs'
import Edu from './comp/Edu'
import Sp from './comp/Sp'
import News from './comp/News'
import Pdm from './comp/Pdm'
import Ct from './comp/Ct'
function App() {
  let [state,setState]=useState({"_id":"","name":"","token":"","role":""})
  let updstate=(obj)=>{
    setState({...state,...obj})
  }
  let obj={"state":state,"updstate":updstate}
  return (
    <BrowserRouter>
    <Ct.Provider value={obj}>
    <Nav/>
    <Routes>
        <Route path='/' element={<Home/>}>
        <Route path="/" element={<All/>}/>
        <Route path="/bs" element={<Bs/>}/>
        <Route path='/edu' element={<Edu/>}/>
        <Route path='/sp' element={<Sp/>}/>
        <Route path='/news' element={<News/>}/>
        <Route path="/pdm" element={<Pdm/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path='/reg' element={<Reg/>}/>
        <Route path="/addpost" element={<Add/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/logout' element={<Logout/>}/>
    </Routes>
    </Ct.Provider>
    </BrowserRouter>
  )
}

export default App