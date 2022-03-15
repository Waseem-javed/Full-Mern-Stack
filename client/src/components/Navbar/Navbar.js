import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { Link, useHistory, useLocation } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { StyledBadge } from "./Styles";
import useStyles from "./Styles";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getDate()) logoutHandler();
    }

    //JWT
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user]);

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/auth");
    setUser(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu">
            <HomeIcon />
          </IconButton>
          <Link to="/" className={classes.title}>
            Memories
          </Link>
          {user ? (
            <>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot">
                <Avatar
                  style={{ height: 24, width: 24 }}
                  alt={user.result.name}
                  src={user.result.imageUrl}>
                  {user.result.name.charAt(0)}
                </Avatar>
              </StyledBadge>
              &nbsp;
              <Typography>{user.result.name}</Typography>
              <IconButton
                size="small"
                onClick={logoutHandler}
                color="secondary">
                <ExitToAppIcon />
              </IconButton>
            </>
          ) : (
            <Link to="/auth" className={classes.login}>
              Login
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
