import React, { useEffect, useRef, useState } from "react";
import "./SideDrawer.css";
// import profilepic from "../../assets/pic.png";
import { NavLink } from "react-router-dom";
import anime from "animejs";
import useModal from "../../HOC/useModal";
import Customize from "../Customize/Customize";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logUserOut } from './../../Redux/Actions/auth';
const SideDrawer = (props) => {
  let drawerClasses = "Side-Drawer";
  if (props.show === true) {
    drawerClasses = "Side-Drawer open";
  }
  const [Modal, open, close] = useModal("root");
  const items = useRef();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const img = useRef();
  const userId = JSON.parse(localStorage.getItem('id'))
  const [animation, setAnimation] = useState();
  const [animationImg, setAnimationImg] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setAnimation(
      anime({
        targets: items.current,
        translateY: [1000, 0],
        delay: 300,
        duration: 400,
        autoplay: false,
        easing: "cubicBezier(.5, .05, .1, .3)",
      })
    );
    setAnimationImg(
      anime({
        targets: img.current,
        translateX: [-500, 0],
        delay: 100,
        duration: 300,
        autoplay: false,
        easing: "cubicBezier(.5, .05, .1, .3)",
      })
    );
  }, []);
  if (props.show) {
    animationImg.play();
    animation.play();
  }
  return (
    <nav className={drawerClasses}>
      <Modal>
        <Customize close={close} />
      </Modal>
      {/* <div ref={img} className="pic">

        <p>profile name</p>
      </div> */}
      <ul
        ref={items}
        onClick={(e) => {
          if (e.target.nodeName === "LI") {
            props.closeSideDraw();
          }
        }}
      >
        <li>
          <i className="fa ml-3 mr-2 fa-home"></i>
          <NavLink to="/" active="active">
            خانه
          </NavLink>
        </li>
        {isAdmin ? (
          <li>
            <i className="fa ml-3 mr-2 fa-users"></i>
            <NavLink to="/admin">ادمین</NavLink>
          </li>
        ) : (
          <li>
            <i className="fa ml-3 mr-2 fa-users"></i>
            <NavLink to={`/user/${userId}`}>پنل کاربری</NavLink>
          </li>
        )}
        <li>
          <button
            onClick={() => {
              dispatch(logUserOut());
            }}
            className="font-thin bg-transparent border-0"
            to="/users"
          >
            خروج
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default SideDrawer;
