import React, { useEffect, useState } from "react";
import { useBlogContext } from "../hooks/useBlogContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Button from "react-bootstrap/Button";
import { BsCheck, BsX } from "react-icons/bs";

function BlogEditForm({ blog, edit, setEdit, setShowBlog, showBlog }) {
  const { dispatch } = useBlogContext();
  const { user } = useAuthContext();

  const [editedtitle, setEditedTitle] = useState("");
  const [editedbody, setEditedBody] = useState("");
  const [editedauthor, setEditedAuthor] = useState("");

  const handleCancel = () => {
    setEdit(false);
  };

  useEffect(() => {
    setEditedTitle(blog.title);
    setEditedBody(blog.body);
    setEditedAuthor(blog.author);
  }, [user]);

  const handleSave = async () => {
    console.log("Blog Id " + blog._id);

    const editedblog = {
      title: editedtitle,
      body: editedbody,
      author: editedauthor,
    };

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/blogs/` + blog._id,
      {
        method: "PATCH",
        body: JSON.stringify(editedblog),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log("failed to update the data");
      return;
    }

    if (response.ok) {
      dispatch({ type: "EDIT_BLOGS", payload: json });
      setEdit(false);

    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3 style={{ margin: "30px" }}>
        Editing Blog <strong className="text-danger">{blog.title}</strong>
      </h3>

      {edit && (
        <form>
          <label>
            <h6>Title: </h6>
          </label>

          <input
            class="form-control"
            type="text"
            value={editedtitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            required
          ></input>

          <label>
            <h6>Body: </h6>
          </label>
          <textarea
            className="form-control"
            type="text-area"
            value={editedbody}
            onChange={(e) => setEditedBody(e.target.value)}
            required
            rows={8}
          ></textarea>

          <label>
            <h6>Author: </h6>
          </label>
          <input
            className="form-control"
            type="text"
            value={editedauthor}
            onChange={(e) => setEditedAuthor(e.target.value)}
            required
            style={{ marginBottom: "30px" }}
          />

          <Button
            variant="success"
            style={{ marginRight: "20px" }}
            onClick={() => handleSave()}
          >
            <BsCheck /> Save Changes
          </Button>
          <Button variant="danger" onClick={() => handleCancel()}>
            <BsX /> Cancel
          </Button>
        </form>
      )}

    </div>
  );
}

export default BlogEditForm;
