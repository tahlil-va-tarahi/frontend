import React, { useEffect, useRef,useState } from "react";
import classes from "./Collections.module.css";
import { classification } from "../../Redux/Actions";
import { connect } from "react-redux";
import overlap from "../../HOC/useOverlap";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
const Collections = (props) => {
  const mainNav = useRef(null);
  const [stickyState, setStickyState] = useState(false);

  useScrollPosition(({ prevPos, currPos }) => {
    if (props.homeToolbar) {
      const isTouching = overlap(props.homeToolbar, mainNav.current);
      if(stickyState !== isTouching){
        setStickyState(isTouching);
      }
    }
  });
  let navClass = [classes.collection,classes.stickyState];
  if (!stickyState) {
    navClass.pop()
  }


  return (
    <>
      <div className={classes.topNav}></div>
      <nav ref={mainNav} className={navClass.join(" ")}>
        <ul style={{listStyleType:'none'}}>
        <li
            className={`cursor-pointer  text-sm ${
              props.classificationName === "" ? "activeee" : ""
            }`}
            onClick={props.classification.bind(null, "")}
          >
            تمام عکس ها
          </li>
          <li
            className={`cursor-pointer  text-sm ${
              props.classificationName === "3" ? "activeee" : ""
            }`}
            onClick={props.classification.bind(null, "3")}
          >
            انتزاعی
          </li>
          <li
            className={`cursor-pointer  text-sm  ${
              props.classificationName === "2" ? "activeee" : ""
            }`}
            onClick={props.classification.bind(null, "2")}
          >
           طبیعت
          </li>
          <li
            className={`cursor-pointer  text-sm e ${
              props.classificationName === "1" ? "activeee" : ""
            }`}
            onClick={props.classification.bind(null, "1")}
          >
            تکنولژی
          </li>
    
        </ul>
      </nav>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    classificationName: state.classificationName.term,
    homeToolbar: state.UIAnimation.homeToolbar,
  };
};
export default connect(mapStateToProps, { classification })(Collections);
