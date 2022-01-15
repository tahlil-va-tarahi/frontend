import React from "react";
import { connect } from "react-redux";
import {changeHomeImage} from '../../../Redux/Actions'
const Bg = (props) => {
  return (
    <div className="p-0 mb-3 lg:mb-0 m-0" onClick={() => props.changeHomeImage(props.imageSrc)}>
      <img src={props.imageSrc} className="w-44 cursor-pointer h-44" alt="img" />
    </div>
  );
};


export default connect(null,{changeHomeImage})(Bg);;
