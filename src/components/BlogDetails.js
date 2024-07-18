import React, { useEffect, useState } from "react";
import BlogEditForm from "./BlogEditForm";
import { useBlogContext } from "../hooks/useBlogContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Button from "react-bootstrap/Button";
import { BsTrash, BsPencil } from "react-icons/bs";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

function BlogDetails({
  blog,
  setLoading,
  setErrorMessage,
  showBlog,
  setShowBlog,
}) {
  const [edit, setEdit] = useState(false);
  const { dispatch } = useBlogContext();

  const { blogs } = useBlogContext();

  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/blogs/` + blog._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_BLOGS", payload: json });
      setLoading(false);

      const remainingBlogs = blogs.filter((b) => b._id !== blog._id);
      console.log(remainingBlogs.length);
      if (remainingBlogs.length > 0) {
        setErrorMessage("");
      } else {
        setErrorMessage("No Blogs Found");
      }
    }
  };

  const handleEdit = () => {
    setEdit(true);
  };

  return (
    <div style={{ padding: "15px" }}>
      <div className="card ">
        <div className="card-body">
          <h2 className="card-title">{blog.title}</h2>
          <p className="card-text">{blog.body}</p>
          <p className="card-text">
            Written By: <strong>{blog.author}</strong>
          </p>
          <p>
            {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
          </p>
          <br />

          <Button
            variant="danger"
            style={{ marginRight: "20px" }}
            onClick={handleDelete}
          >
            <BsTrash /> Delete
          </Button>
          <Button onClick={handleEdit}>
            <BsPencil /> Edit
          </Button>
        </div>
      </div>

      {edit && (
        <BlogEditForm
          blog={blog}
          edit={edit}
          setEdit={setEdit}
          setShowBlog={setShowBlog}
          showBlog={showBlog}
        />
      )}
    </div>
  );
}

export default BlogDetails;
