import { Link, json } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { BsHouseDoor} from 'react-icons/bs';
import { FaUser,FaSignOutAlt } from 'react-icons/fa';



function Navbar() {
  const { user} = useAuthContext();
  const {logout}=useLogout();


  const [authUsername,setAuthUsername]=useState();



  const handleLogout=()=>{
    logout();
  }



  const isAuth= user ? `${user.username}` : "";






useEffect(()=>{

  

const fetechUserDetails=async(email)=>{
  const response=await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/getProfile/`+email,{
    method:"GET"
  })

  if(response.ok){
    const json=await response.json();
    setAuthUsername(json.username);
  }
}

if(user){
  fetechUserDetails(user.email);
}


  

})





  return (








    <div className="p-3 mb-2 bg-light text-dark navbar">
      <h1>
        <Link className="header-element h1" to="/">
          Milton<small>Blogs</small>
        </Link>
      </h1>
        {isAuth && (
<ul>

<Link  to="/getProfile" className="username-css">Hi, {authUsername}</Link>

<Link to="/" className="links">
         <BsHouseDoor/> Home
        </Link>

        <Link to="/getProfile" className="links">
        <FaUser/>  Profile
        </Link>

        <Link onClick={handleLogout}  className="links">
        <FaSignOutAlt/>  Logout
        </Link>
</ul>
        )}

        {
          !isAuth && (
            <ul>
  <Link to="/login" className="links">
          Login
        </Link>
        <Link to="/signup" className="links">
          Signup
        </Link>
            </ul>
          )
        }
        



      



      
      
   
    </div>
  );
}

export default Navbar;
