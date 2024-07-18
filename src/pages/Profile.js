import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaUser, FaEnvelope } from "react-icons/fa"; // Import icons
import "../styles/Profile.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuthContext();
  const [uusername, setUsername] = useState("");
  const [uemail, setEmail] = useState("");

  useEffect(() => {
    const fetchUserDetails = async (email) => {
      try {
        const response = await fetch(
          "http://localhost:7000/api/user/getProfile/" + email,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const jsonData = await response.json();
          setUsername(jsonData.username);
          setEmail(jsonData.email);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetchUserDetails(user.email);
    }
  }, [user]);

  const handleSave = async (e) => {
    const userInfo = await localStorage.getItem("user");
    const reqEmail = userInfo.email;

    e.preventDefault();
    const updatedUserDetails = {
      uusername,
      uemail,
    };

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/user/UpdateUser/` + reqEmail,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserDetails),
      }
    );

    if (response.ok) {
      const json = await response.json();
      setUsername(json.uusername);
      setEmail(json.uemail);
    }
  };

  return (
    <div className="container">
      <h1>Profile Info</h1>
      <form>
        <label>
          <h6>
            Username: <FaUser />
          </h6>
        </label>

        <input
          className="form-control"
          type="text"
          value={uusername}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>
          <h6>
            Email: <FaEnvelope />
          </h6>
        </label>
        <input
          className="form-control customInput"
          type="email"
          value={uemail}
          onChange={(e) => setEmail(e.target.value)}
        />
       <Link to="/" ><Button style={{marginRight:"20px"}} variant="primary" onClick={handleSave}>
          Save
        </Button></Link>
        <Link to="/" ><Button variant="secondary">Cancel</Button></Link>
      </form>
    </div>
  );
};

export default Profile;
