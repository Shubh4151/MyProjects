import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// import '../Reg.css'

function Reg() {
let [data, udata] = useState({ "_id": "", "name": "", "phno": "", "pwd": "" })
let [msg, umsg] = useState("")
let navigate = useNavigate()

  let fun = (e) => {
    udata({ ...data, [e.target.name]: e.target.value })
  }
  let reg = () => {
    if (data._id !== "" && data.name !== "" && data.pwd !== "" && data.phno !== "") {
      axios.post("http://localhost:5000/reg", data).then((res) => {
        umsg(res.data.msg)
      })
    }else{
      umsg("Please fill all the details")
    }
  }

  let log=()=>{
    navigate("/login")
  }



  return (
    <div className='form'>
      <div className='form-con'>
        <div className='form-lft'>
          <h1>Welcome Back</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button className='btn' onClick={log}>Sign In</button>
        </div>

        <div className='form-rgt'>
          <h1>Register Here</h1>
          <h4 className='msg'>{msg}</h4>
          <div className='input'>
            <input type='text' placeholder='Email' name='_id' onChange={fun} value={data._id}/>
            <input type='text' placeholder='Name' name='name' onChange={fun} value={data.name}/>
            <input type='text' placeholder='Password' name='pwd' onChange={fun} value={data.pwd}/>
            <input type='text' placeholder='Contact Number' name='phno' onChange={fun} value={data.phno}/>
          <button onClick={reg} className='btn'>Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reg