import React, { useState } from "react";
import { useBlogContext } from "../hooks/useBlogContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Button from "react-bootstrap/Button";
import { BsCheck, BsX } from "react-icons/bs";
import { message } from 'antd';



           
            function BlogForm({ setShowBlog, setShowForm ,setLoading,setErrorMessage,errormessage}) {
             
  const {  blogs,dispatch } = useBlogContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const formSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");

      return;
    }
    const blog = { title, body, author };

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/blogs`, {
      method: "POST",
      body: JSON.stringify(blog),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "ADD_BLOGS", payload: json });
      message.success("Blog Added")
      setTitle("");
      setBody("");
      setAuthor("");

      setError(null);

      setShowForm(false);
      setShowBlog(true);
      setLoading(false)
    }

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowBlog(true)
 
   

    if (blogs && blogs.length > 0) {
      setErrorMessage(""); 
    } else {
      setErrorMessage("No Blogs Found");
    }
         
          
          
      

 
    
  };

  return (
  
      <div className="container">
        <h1>Create a blog</h1>
        <form onSubmit={formSubmit}>
        <label>
              <h6>Title: </h6>
            </label>

            <input
              className="form-control"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></input>
     
     <label>
              <h6>Body: </h6>
            </label>
            <textarea
              className="form-control"
              type="text-area"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={8}
            ></textarea>
          <br />
          <label>
              <h6>Author: </h6>
            </label>
            <input
              className="form-control"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              style={{ marginBottom: "30px" }}
            />
        
             <Button type="submit"
              variant="success" style={{marginRight:"20px"}}> <BsCheck /> Add </Button>
            <Button variant="danger" onClick={handleCancel}> <BsX /> Cancel
            </Button>
            </form>
         
     
 
        {error && <div>{error}</div>}
      
      </div>

  );
}

export default BlogForm;
