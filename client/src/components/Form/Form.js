import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Paper, Button, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";

import { createPost, updatePost } from "../../redux/actions/post";

import useStyles from "./Styles";
import { Link } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, {
          ...postData,
          selectedFile: file.base64,
          name: user?.result?.name,
        })
      );
    } else {
      dispatch(
        createPost({
          ...postData,
          selectedFile: file.base64,
          name: user?.result?.name,
        })
      );
    }
    clearHandler();
  };

  const clearHandler = () => {
    setCurrentId(null);
    setFile(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <h2 style={{ color: "#FFF", fontSize: 20, textAlign: "center" }}>
        Please Login to create your own memories!
        <br />
        <Link to="/auth">SIGN IN</Link>
      </h2>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}>
        <Typography variant="h6">
          {currentId ? `Editing` : "Creating"} a Memory
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={changeHandler}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={changeHandler}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={changeHandler}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            value={file}
            onDone={(file) => setFile(file)}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          size="large">
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          fullWidth
          size="small"
          onClick={clearHandler}>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
