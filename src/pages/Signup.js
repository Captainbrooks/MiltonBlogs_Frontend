import { useState } from "react";
import { useSignup } from "../hooks/useSignUp";
// import "../styles/Signup.css";
import { FaUser, FaEnvelope,FaLock } from "react-icons/fa";
import { Button } from "react-bootstrap";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(username, email, password);
  };

  return (
    <div className="container">
      <h1>Sign up</h1>
      <form onSubmit={handleSignup}>
      <label>
          <h6>
            Username:  < FaUser />
          </h6>
        </label>
        <input
        className="form-control"
          type="text"
          value={username}
          required
          onChange={(e) => setUserName(e.target.value)}
        />

       <label>
          <h6>
            Email:  <FaEnvelope />
          </h6>
        </label>
        <input
        className="form-control"
          type="text"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
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
        <Button type="submit" style={{margin:"20px 70px"}} disabled={isLoading}>Sign up</Button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
