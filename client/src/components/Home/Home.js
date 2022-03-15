import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Container, Grid } from "@material-ui/core";

import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import Posts from "../../components/Posts/Posts";
import Form from "../../components/Form/Form";
import useStyles from "./Styles";
import { getPosts } from "../../redux/actions/post.js";
const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (!user) history.push("/auth");
    dispatch(getPosts());
  }, [dispatch, history]);

  return (
    <Container>
      <Grid container display="flex" justifyContent="space-around">
        <Grid item xs={12} sm={10}>
          <Navbar />
        </Grid>
      </Grid>
      <Grid
        className={classes.mainContainer}
        container
        display="flex"
        justifyContent="center"
        spacing={2}>
        <Grid item xs={12} sm={10}>
          <Grid container display="flex" justifyContent="space-between">
            <Grid item xs={12} sm={8}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container display="flex" justifyContent="space-around">
        <Grid item xs={12} sm={10}>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
