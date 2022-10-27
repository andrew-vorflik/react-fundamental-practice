import React from "react";
import classes from "./Loading.module.scss";

export const Loading = () => {
  return (
    <div className={classes["lds-ring"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
