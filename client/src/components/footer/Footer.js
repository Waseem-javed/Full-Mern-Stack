import React from "react";
import useStyles from "./Styles.js";

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer} variant="dense">
      Copyright &copy; {new Date().getFullYear()}
    </div>
  );
};

export default Footer;
