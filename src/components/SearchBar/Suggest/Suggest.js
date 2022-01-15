import React from "react";
import classes from "./Suggest.module.css";
import history from "../../../history";
const Suggest = (props) => {
  let icon = null;
  if (props.icon) icon = <span className="mr-2 ">{props.icon}</span>;

  return (
    <div className={classes.suggestContainer}>
      <div onClick={() => history.push("/search/" + props.title)}>
        {icon}
        {props.title}
      </div>
      <i onClick={props.click} className="fas fa-times"></i>
    </div>
  );
};

export default Suggest;
