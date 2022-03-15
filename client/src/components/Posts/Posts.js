import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";
import Post from "./Post/Post";

import useStyles from "./Styles";
import Pagination from "../Pagination/Pagination";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const pages = [2, 5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const posts = useSelector((state) => state.posts);
  return !posts.length ? (
    <div style={{ textAlign: "center" }}>
      <CircularProgress />
    </div>
  ) : (
    <>
      <Grid className={classes.container} container spacing={2}>
        {posts
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((post, index) => (
            <Grid item xs={12} sm={5} md={5} key={index}>
              <Post key={index} post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
      </Grid>
      <Pagination
        page={page}
        data={posts}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={pages}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Posts;
