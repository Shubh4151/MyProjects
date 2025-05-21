import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/login", { email, pwd });
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", email);
      navigate("/todo");
    } else {
      alert(res.data.msg || res.data.err);
    }
  };

  return (
    <div className='con'>
    <div className='card'>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPwd(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
    </div>
    </div>
  );
};

export default Home;
