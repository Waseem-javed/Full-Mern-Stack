import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { signup, signin } from "../../redux/actions/auth";
import Input from "./Input";
import useStyles from "./Styles";
import Icon from "./icon";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, history));
    }
    dispatch(signin(formData, history));
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const onGoogleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", payload: { result, token } });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const onGoogleFailure = (error) => {
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography color="primary" variant="h5">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  label="First Name"
                  name="firstName"
                  type="text"
                  autoFocus
                  half
                  handleChange={handleChange}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  type="text"
                  half
                  handleChange={handleChange}
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              type="email"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                variant="outlined"
                name="confirmPassword"
                label="Confirm Password"
                type={"password"}
                value={formData.confirmPassword}
                handleChange={handleChange}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              clientId="681897165737-ndlehg5fus18j3tnba9v0dkk9rvvngvp.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained">
                  Google Sign In
                </Button>
              )}
              onSuccess={onGoogleSuccess}
              onFailure={onGoogleFailure}
              cookiePolicy="single_host_origin"
            />
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode} variant="span">
                  {isSignUp
                    ? "Already have an Account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
