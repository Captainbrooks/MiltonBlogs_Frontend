import { Component, useEffect, useState } from "react";

import BlogDetails from "../components/BlogDetails";
import BlogForm from "../components/BlogForm";
import { useAuthContext } from "../hooks/useAuthContext";

import { useBlogContext } from "../hooks/useBlogContext";

import Loading from "../components/Loading";

import Button from "react-bootstrap/Button";

function Home() {
  const { blogs, dispatch } = useBlogContext();
  const [showform, setShowForm] = useState(false);
  const [errormessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const [editmode, setEditMode] = useState(false);

  const [showBlog, setShowBlog] = useState(true);

  useEffect(() => {

    console.log(`${process.env.REACT_APP_BASE_URL}`)



    const fetchBlogs = async () => {

      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/blogs`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SHOW_BLOGS", payload: json });
      
        setLoading(false);
      }
      else{
        setLoading(false)
      }
    };

    if (user) {
      fetchBlogs();
      setLoading(false)
    }

    if (blogs && blogs.length > 0) {
      setErrorMessage("");
    } else {
      setErrorMessage("No Blogs Found");
    }
  }, [dispatch, user]);

  const handleForm = () => {
    setShowForm(true);
    setShowBlog(false);
    setErrorMessage("");
    setLoading(false);
  };

  return (
    <div className="p-3 mb-2 bg-white text-dark">
      <Button className="btn btn-success" onClick={() => handleForm()}>
        Create New Blog
      </Button>


      {showform && (
        <BlogForm
          setShowBlog={setShowBlog}
          setShowForm={setShowForm}
          errormessage={errormessage}
          setErrorMessage={setErrorMessage}
          setLoading={setLoading}
        />
      )}
   

      {blogs && blogs.length > 0 && showBlog ? (
        blogs.map((blog) => (
          <BlogDetails
            key={blog._id}
            blog={blog}
            setLoading={setLoading}
            editmode={editmode}
            setEditMode={setEditMode}
            setErrorMessage={setErrorMessage}
            errormessage={errormessage}
            showBlog={showBlog}
            setShowBlog={setShowBlog}
          />
        ))
      ) : (
        <div>{errormessage}</div>
      )}

      {loading && <Loading />}
    </div>
  );
}

export default Home;
