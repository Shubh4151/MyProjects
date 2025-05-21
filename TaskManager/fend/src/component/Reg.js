import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Reg = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();


  const handleRegister = async () => {
    if (!email.trim() || !pwd.trim()) {
      alert("Email and Password are required.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/register", { email, pwd });
      if (res.data.msg) {
        alert(res.data.msg);
        navigate("/");
      } else {
        alert(res.data.err);
      }
    } catch (err) {
      alert("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className='con'>
    <div className='card'>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={pwd} placeholder="Password" onChange={(e) => setPwd(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
    </div>
  );
};
export default Reg;