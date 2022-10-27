import React from "react";
import classes from "./Error.module.scss";

export const Error = ({ message }) => {
  return (
    <div className={classes.error}>
      <h2>Ooops! Some error detected &#129300;</h2>
      <p>{message}</p>
    </div>
  );
};
