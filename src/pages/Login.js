import React from 'react'
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin';
// import "../styles/Login.css";
import { Button } from "react-bootstrap";

import { FaUser, FaEnvelope,FaLock } from "react-icons/fa";




const Login=()=> {


const [email, setEmail]=useState("");
const [password, setPassword]=useState("");
const {login,error,isLoading}=useLogin();




const handleLogin=async(e)=>{
  e.preventDefault();
  await login(email,password)

}


  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
      <label>
          <h6>
            Email:  <FaEnvelope />
          </h6>
        </label>
        <input 
        className='form-control'
        type="text"
        value={email}
        required
        onChange={(e)=>setEmail(e.target.value)}
         />

<label>
          <h6>
            Password:   <FaLock />
          </h6>
        </label>
        <input
        className='form-control'
         type="password"
        value={password}
        required
        onChange={(e)=>setPassword(e.target.value)}
         />
           <Button type="submit" style={{margin:"20px 70px"}} disabled={isLoading}>Login</Button>
             {error && <div className="error">{error}</div>}


      </form>
    </div>
  )
}

export default Login
